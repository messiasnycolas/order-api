import { XMLBuilder } from 'fast-xml-parser';

export function buildXML(object: object): XMLDocument {
    const config = {
        ignoreAttributes: false,
    }

    const builder = new XMLBuilder(config);
    const xmlContent = builder.build(object);

    return xmlContent;
}