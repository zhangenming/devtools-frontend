// Copyright 2026 The Chromium Authors
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
import * as Common from '../../core/common/common.js';
export var Events;
(function (Events) {
    Events["CHANGED"] = "Changed";
})(Events || (Events = {}));
export class CommentThread extends Common.ObjectWrapper.ObjectWrapper {
    static #nextIndex = 1;
    static resetIndex() {
        CommentThread.#nextIndex = 1;
    }
    id = crypto.randomUUID();
    anchor;
    #savedIndex;
    comments;
    status = 'DRAFT';
    transmitted = false;
    changes;
    constructor(options) {
        super();
        this.anchor = options.anchor;
        this.comments = options.comments ?? [];
        this.changes = options.changes;
    }
    get index() {
        return this.#savedIndex ?? CommentThread.#nextIndex;
    }
    /**
     * Returns whether it was changed.
     */
    #saveText(text, author = 'DEVELOPER') {
        if (text && text.trim().length > 0) {
            this.comments.push({
                author,
                text: text.trim(),
                timestamp: Date.now(),
            });
            return true;
        }
        return false;
    }
    save(text, author = 'DEVELOPER') {
        let changed = this.#saveText(text, author);
        if (this.status === 'DRAFT') {
            if (this.#savedIndex === undefined) {
                this.#savedIndex = CommentThread.#nextIndex++;
            }
            this.status = 'ACTIVE';
            changed = true;
        }
        if (changed) {
            this.dispatchEventToListeners("Changed" /* Events.CHANGED */);
        }
    }
    sendToAgent(text, author = 'DEVELOPER') {
        let changed = this.#saveText(text, author);
        if (this.status === 'DRAFT' || this.status === 'ACTIVE') {
            if (this.#savedIndex === undefined) {
                this.#savedIndex = CommentThread.#nextIndex++;
            }
            this.status = 'SENT_TO_AGENT';
            changed = true;
        }
        if (changed) {
            this.dispatchEventToListeners("Changed" /* Events.CHANGED */);
        }
    }
    resolve(replyText) {
        if (replyText && replyText.trim().length > 0) {
            this.comments.push({
                author: 'AGENT',
                text: replyText.trim(),
                timestamp: Date.now(),
            });
        }
        if (this.#savedIndex === undefined) {
            this.#savedIndex = CommentThread.#nextIndex++;
        }
        this.status = 'RESOLVED';
        this.dispatchEventToListeners("Changed" /* Events.CHANGED */);
    }
}
//# sourceMappingURL=CommentThread.js.map