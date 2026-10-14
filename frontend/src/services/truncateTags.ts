// Tags of larger lengths will span outside of the container, so we truncate them
export function truncateTags(tags: string[]) {
    const maxLength = 30;
    return tags.map(tag => {
        if (tag.length > maxLength) {
            return tag.substring(0, maxLength) + '...';
        } else {
            return tag;
        }
    });
}