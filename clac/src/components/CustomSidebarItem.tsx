import React from 'react';
import Link from '@docusaurus/Link';

export default function CustomSidebarItem(props) {
    const { item, onClick, activePath, level, ...rest } = props;

    // Log the props to see what's being passed
    console.log('CustomSidebarItem props:', props);

    if (item.type === 'link') {
        return (
            <Link
                to={item.href}
                onClick={onClick}
                style={{
                    // Add some styling to make it obvious this is your custom component
                    color: activePath === item.href ? 'red' : 'blue',
                    fontWeight: 'bold',
                }}
                {...rest}
            >
                {item.label}
            </Link>
        );
    }

    // For other item types (category, doc, etc.), you might want to render them differently
    return <div>{item.label}</div>;
}