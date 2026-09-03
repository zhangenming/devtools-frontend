import type * as SDK from '../../../../core/sdk/sdk.js';
import * as UI from '../../legacy.js';
export declare class CustomPreviewSection extends UI.Widget.Widget {
    #private;
    private expanded;
    private cachedContent?;
    private headerJsonML?;
    get object(): SDK.RemoteObject.RemoteObject | undefined;
    set object(object: SDK.RemoteObject.RemoteObject | undefined);
    private parseHeader;
    wasShown(): void;
    performUpdate(): void;
    private render;
    private renderJSONMLTag;
    private renderElement;
    private layoutObjectTag;
    private onClick;
    private toggleExpand;
    loadBody(): Promise<void>;
}
export declare class CustomPreviewComponent {
    private readonly object;
    private customPreviewSection;
    element: HTMLSpanElement;
    constructor(object: SDK.RemoteObject.RemoteObject);
    expandIfPossible(): Promise<void>;
    private contextMenuEventFired;
    private disassemble;
}
