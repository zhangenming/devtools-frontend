import type * as SDK from '../../../core/sdk/sdk.js';
import { ConversationContext, type ConversationSuggestions } from '../agents/AiAgent.js';
export declare class DOMNodeContext extends ConversationContext<SDK.DOMModel.DOMNode> {
    #private;
    constructor(node: SDK.DOMModel.DOMNode);
    getURL(): string;
    getItem(): SDK.DOMModel.DOMNode;
    getTitle(): string;
    getSuggestions(): Promise<ConversationSuggestions | undefined>;
}
