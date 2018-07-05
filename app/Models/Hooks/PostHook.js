'use strict'

const PostHook = exports = module.exports = {}

PostHook.latest = async (post) => {
    post.updated_at('desc')
}
