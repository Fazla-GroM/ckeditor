import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
import List from '@ckeditor/ckeditor5-list/src/list'
import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import ViewText from '@ckeditor/ckeditor5-engine/src/view/text'
import ViewElement from '@ckeditor/ckeditor5-engine/src/view/element'
import ViewDocumentFragment from '@ckeditor/ckeditor5-engine/src/view/documentfragment'
//import * as Nesto from '@ckeditor/ckeditor5-engine/src/view/documentfragment'
export const config = {
  plugins: [Essentials, Paragraph, Bold, Italic, List, Heading]
}

export default class JsonClassicEditor extends ClassicEditor {
  constructor(element, config) {
    super(element, config)

    this.data.processor = new JsonDataProcessor()
  }
}

class JsonDataProcessor {
  toData(viewFragment) {
    console.log('data', viewFragment)
    const json = []
    console.log('jsonj', json)
    for (const child of viewFragment) {
      const childJson = viewToJson(child)

      json.push(childJson)
    }

    return JSON.stringify(json)
  }

  toView(jsonString) {
    console.log('view', jsonString)
    const jsonData = JSON.parse(jsonString)
    const viewFragment = new ViewDocumentFragment()
    console.log('View Fragmen', viewFragment)
    for (const childJson of jsonData) {
      const child = jsonToView(childJson)

      viewFragment._appendChild(child)
    }

    return viewFragment
  }
}

function viewToJson(viewElement) {
  const json = {}

  if (viewElement.is('text')) {
    json.text = viewElement.data
  } else {
    json.name = viewElement.name
    json.attributes = {}

    for (const [key, value] of viewElement.getAttributes()) {
      json.attributes[key] = value
    }

    json.children = []

    for (const child of viewElement.getChildren()) {
      json.children.push(viewToJson(child))
    }
  }

  return json
}

function jsonToView(jsonObject) {
  if (jsonObject.text) {
    return new ViewText(jsonObject.text)
  } else {
    const viewElement = new ViewElement(jsonObject.name, jsonObject.attributes)
    console.log('viewEL', viewElement)

    for (const childJson of jsonObject.children) {
      const viewChild = jsonToView(childJson)
      viewElement._appendChild(viewChild)
    }

    return viewElement
  }
}
