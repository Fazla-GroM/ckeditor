import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials'
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph'
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold'
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic'
// import List from '@ckeditor/ckeditor5-list/src/list'
// import Heading from '@ckeditor/ckeditor5-heading/src/heading'
import ViewText from '@ckeditor/ckeditor5-engine/src/view/text'
import ViewElement from '@ckeditor/ckeditor5-engine/src/view/element'
import ViewDocumentFragment from '@ckeditor/ckeditor5-engine/src/view/documentfragment'

export default class XmlClassicEditor extends ClassicEditor {
  constructor(element, config) {
    super(element, config)
    this.data.processor = new XmlDataProcessor()
  }
}

class XmlDataProcessor {
  elementMap = {
    orderedlist: 'ol',
    listitem: 'li',
    title: 'h2',
    subtitle: 'h3',
    para: 'p',
    quote: 'b',
    ulink: 'a'
  }

  attributeMap = {
    url: 'href'
  }

  toData(viewFragment) {
    console.log('data', viewFragment)
    // const json = []
    // console.log('jsonj', json)
    // for (const child of viewFragment) {
    //   const childJson = viewToJson(child)

    //   json.push(childJson)
    // }

    // return JSON.stringify(json)
  }

  toView(xml) {
    const domParser = new DOMParser()
    const docbookDoc = domParser.parseFromString(xml, 'text/xml')
    console.log(docbookDoc.documentElement.children)
    const viewFragment = new ViewDocumentFragment()

    for (const element of docbookDoc.documentElement.children) {
      const view = this.elementToView(element)
      viewFragment._appendChild(view)
    }
    return viewFragment
  }

  elementToTextView(element, parent) {
    const { textContent } = element

    // trim for now to remove identation, this should not be an issue
    // when returned markup is minified
    return new ViewText(textContent.trim())
  }

  attributesToValues(attributes) {
    if (!attributes) {
      return {}
    }

    return Object.keys(attributes).reduce((acc, key) => {
      const { name, value } = attributes[key]

      if (value) {
        acc[this.attributeMap[name] || name] = value
      }

      return acc
    }, {})
  }

  elementToView(element, parent) {
    const { nodeName, attributes, childNodes: children } = element

    const name = this.elementMap[nodeName] || nodeName
    // const name = elementMap[nodeName] || nodeName // kad napises sve mappinge onda liniju iznad zamjenis da actually throw-a ak dođe element kojeg ne znamo
    if (!name) {
      throw new Error(`No mapping for element '${nodeName}'`)
    }

    const viewElement = new ViewElement(name, this.attributesToValues(attributes))

    if (children) {
      for (let child of children) {
        const { nodeType, parentNode } = child
        let viewChild
        
        if (nodeType === 3 || (parentNode && parentNode.nodeName === 'listitem')) {
          viewChild = this.elementToTextView(child, element)
        } else {
          viewChild = this.elementToView(child, element)
        }
        
        viewElement._appendChild(viewChild)
      }
    }

    return viewElement
  }
}
