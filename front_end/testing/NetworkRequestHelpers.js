// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Platform from '../core/platform/platform.js';
import * as SDK from '../core/sdk/sdk.js';
const { urlString } = Platform.DevToolsPath;
/**
 * Creates and configures a synthetic {@link SDK.NetworkRequest.NetworkRequest} for unit testing.
 * Automatically handles string-to-UrlString conversion and provides default values
 * so callers only need to specify properties relevant to their test case.
 */
export function createNetworkRequest(options = {}) {
    const reqId = (options.requestId ?? 'requestId');
    const rawUrl = options.url ?? 'https://example.com';
    const reqUrl = typeof rawUrl === 'string' ? urlString `${rawUrl}` : rawUrl;
    // Default documentURL to reqUrl so that requests are same-origin by default,
    // avoiding unintended cross-origin redactions or security checks in tests.
    const rawDocUrl = options.documentURL ?? reqUrl;
    const docUrl = typeof rawDocUrl === 'string' ? urlString `${rawDocUrl}` : rawDocUrl;
    const request = options.withoutBackend ? SDK.NetworkRequest.NetworkRequest.createWithoutBackendRequest(reqId, reqUrl, docUrl, options.initiator ?? null) :
        SDK.NetworkRequest.NetworkRequest.create(reqId, reqUrl, docUrl, options.frameId ?? null, options.loaderId ?? null, options.initiator ?? null);
    if (options.statusCode !== undefined) {
        request.statusCode = options.statusCode;
    }
    if (options.statusText !== undefined) {
        request.statusText = options.statusText;
    }
    if (options.requestMethod !== undefined) {
        request.requestMethod = options.requestMethod;
    }
    if (options.requestHeaders) {
        request.setRequestHeaders(options.requestHeaders);
    }
    if (options.responseHeaders) {
        request.responseHeaders = options.responseHeaders;
    }
    if (options.mimeType !== undefined) {
        request.mimeType = options.mimeType;
    }
    if (options.resourceType !== undefined) {
        request.setResourceType(options.resourceType);
    }
    if (options.finished !== undefined) {
        request.finished = options.finished;
    }
    if (options.contentData) {
        const dataOrFn = options.contentData;
        request.setContentDataProvider(typeof dataOrFn === 'function' ? dataOrFn : () => Promise.resolve(dataOrFn));
    }
    if (options.isImportedHar !== undefined) {
        request.setIsImportedHar(options.isImportedHar);
    }
    return request;
}
//# sourceMappingURL=NetworkRequestHelpers.js.map