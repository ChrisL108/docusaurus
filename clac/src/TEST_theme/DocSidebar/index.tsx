// src/theme/DocSidebar/index.tsx
import React from 'react';
import { useDocsSidebar } from '@docusaurus/theme-common/internal';
import { useLocation } from '@docusaurus/router';
import DocSidebarItems from '@theme/DocSidebarItems';
import type { Props } from '@theme/DocSidebar';

function DocSidebar(): JSX.Element | null {
    const sidebar = useDocsSidebar();
    const { pathname } = useLocation();

    if (!sidebar) {
        return null;
    }

    return (
        <aside className="sidebar">
            <nav
                className="menu thin-scrollbar"
                aria-label="Docs sidebar"
            >
                <DocSidebarItems
                    items={sidebar.items}
                    activePath={pathname}
                    level={1}
                />
            </nav>
        </aside>
    );
}

export default React.memo(DocSidebar);