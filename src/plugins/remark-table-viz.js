import { visit } from 'unist-util-visit';

export default function rehypeTableViz() {
    return (tree) => {
        visit(tree, 'element', (node) => {
            if (node.tagName === 'table') {
                // Add class to the table element directly
                node.properties.className = node.properties.className || [];
                node.properties.className.push('table-viz');
            }
        });
    };
}

