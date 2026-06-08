// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import { ConversationContext, } from '../agents/AiAgent.js';
export class DOMNodeContext extends ConversationContext {
    #node;
    constructor(node) {
        super();
        this.#node = node;
    }
    getURL() {
        const ownerDocument = this.#node.ownerDocument;
        if (!ownerDocument) {
            // The node is detached from a document.
            return 'detached';
        }
        return ownerDocument.documentURL;
    }
    getItem() {
        return this.#node;
    }
    getTitle() {
        throw new Error('Not implemented');
    }
    async getSuggestions() {
        const layoutProps = await this.#node.domModel().cssModel().getLayoutPropertiesFromComputedStyle(this.#node.id);
        if (!layoutProps) {
            return;
        }
        if (layoutProps.isFlex) {
            return [
                { title: 'How can I make flex items wrap?', jslogContext: 'flex-wrap' },
                { title: 'How do I distribute flex items evenly?', jslogContext: 'flex-distribute' },
                { title: 'What is flexbox?', jslogContext: 'flex-what' },
            ];
        }
        if (layoutProps.isSubgrid) {
            return [
                { title: 'Where is this grid defined?', jslogContext: 'subgrid-where' },
                { title: 'How to overwrite parent grid properties?', jslogContext: 'subgrid-override' },
                { title: 'How do subgrids work? ', jslogContext: 'subgrid-how' },
            ];
        }
        if (layoutProps.isGrid) {
            return [
                { title: 'How do I align items in a grid?', jslogContext: 'grid-align' },
                { title: 'How to add spacing between grid items?', jslogContext: 'grid-gap' },
                { title: 'How does grid layout work?', jslogContext: 'grid-how' },
            ];
        }
        if (layoutProps.hasScroll) {
            return [
                { title: 'How do I remove scrollbars for this element?', jslogContext: 'scroll-remove' },
                { title: 'How can I style a scrollbar?', jslogContext: 'scroll-style' },
                { title: 'Why does this element scroll?', jslogContext: 'scroll-why' },
            ];
        }
        if (layoutProps.containerType) {
            return [
                { title: 'What are container queries?', jslogContext: 'container-what' },
                { title: 'How do I use container-type?', jslogContext: 'container-how' },
                { title: 'What\'s the container context for this element?', jslogContext: 'container-context' },
            ];
        }
        return;
    }
}
//# sourceMappingURL=DOMNodeContext.js.map