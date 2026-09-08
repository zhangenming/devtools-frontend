import type * as Common from '../core/common/common.js';
import * as Platform from '../core/platform/platform.js';
import * as SDK from '../core/sdk/sdk.js';
import type * as TextUtils from '../core/text_utils/text_utils.js';
import type * as Protocol from '../generated/protocol.js';
/**
 * Configuration options for creating a mock {@link SDK.NetworkRequest.NetworkRequest}.
 */
export interface CreateNetworkRequestOptions {
    /** The URL for the request. Defaults to `'https://example.com'`. */
    url?: string | Platform.DevToolsPath.UrlString;
    /**
     * The document/initiator page URL. Defaults to the request's `url`, making the
     * request same-origin by default. Specify a different URL or empty string to test
     * cross-origin behavior.
     */
    documentURL?: string | Platform.DevToolsPath.UrlString;
    /** The request identifier. Defaults to `'requestId'`. */
    requestId?: string | Protocol.Network.RequestId;
    /**
     * If true, creates a request via `createWithoutBackendRequest`, which leaves
     * `backendRequestId()` undefined and omits frame/loader associations.
     */
    withoutBackend?: boolean;
    statusCode?: number;
    statusText?: string;
    requestMethod?: string;
    requestHeaders?: SDK.NetworkRequest.NameValue[];
    responseHeaders?: SDK.NetworkRequest.NameValue[];
    /**
     * Content data or a content data provider function. When provided, configures
     * `request.setContentDataProvider()`. Pass a function returning `{error: string}`
     * to simulate content retrieval failures.
     */
    contentData?: TextUtils.ContentData.ContentData | (() => Promise<TextUtils.ContentData.ContentDataOrError>);
    /** Flags the request as imported from a HAR archive via `setIsImportedHar()`. */
    isImportedHar?: boolean;
    mimeType?: string;
    resourceType?: Common.ResourceType.ResourceType;
    finished?: boolean;
    initiator?: Protocol.Network.Initiator | null;
    frameId?: Protocol.Page.FrameId | null;
    loaderId?: Protocol.Network.LoaderId | null;
}
/**
 * Creates and configures a synthetic {@link SDK.NetworkRequest.NetworkRequest} for unit testing.
 * Automatically handles string-to-UrlString conversion and provides default values
 * so callers only need to specify properties relevant to their test case.
 */
export declare function createNetworkRequest(options?: CreateNetworkRequestOptions): SDK.NetworkRequest.NetworkRequest;
