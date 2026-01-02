import { visit } from 'unist-util-visit';

export default function remarkImageResize() {
    return (tree) => {
        visit(tree, 'image', (node) => {
            // Check if the alt text or URL contains '|percentage'
            const match = node.url.match(/(.+)\|(\d+)$/);
            if (match) {
                const [_, url, percentage] = match;
                node.url = url; // Remove the |percentage from URL
                // Transform to HTML img with width as percentage
                node.type = 'html';
                node.value = `<img src="${url}" alt="${node.alt || ''}" width="${percentage}%" />`;
            }
        });
    };
}