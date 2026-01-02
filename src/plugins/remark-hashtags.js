import { visit } from 'unist-util-visit';

export default function remarkHashtags() {
    return (tree) => {
        visit(tree, 'text', (node) => {
            // Regex to find hashtags (word characters after #)
            const hashtagRegex = /(#\w+)/g;
            if (hashtagRegex.test(node.value)) {
                // Replace hashtags with HTML spans
                node.type = 'html';
                node.value = node.value.replace(hashtagRegex, '<span class="hashtag">$1</span>');
            }
        });
    };
}