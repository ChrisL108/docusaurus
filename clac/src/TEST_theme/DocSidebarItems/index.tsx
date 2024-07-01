// src/theme/DocSidebarItems/index.tsx
import React from 'react';
import { useDocSidebarItemsExpandedState } from '@docusaurus/theme-common/internal';
import DocSidebarItem from '@theme/DocSidebarItem';
import type { Props } from '@theme/DocSidebarItems';

export default function DocSidebarItems({
    items,
    ...props
}: Props): JSX.Element {
    const { expandedItem, setExpandedItem } = useDocSidebarItemsExpandedState();

    return (
        <>
            {items.map((item, index) => (
                <DocSidebarItem
                    key={index}
                    item={item}
                    index={index}
                    {...props}
                    {...(item.type === 'category' && {
                        isExpanded: expandedItem === index,
                        onToggle: () => setExpandedItem(index),
                    })}
                />
            ))}
        </>
    );
}