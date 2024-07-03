// src/components/MarkdocPageWrapper.tsx
import React, { useEffect, useState } from 'react';
import { HtmlClassNameProvider } from '@docusaurus/theme-common';
import { DocProvider, DocsSidebarProvider, ScrollControllerProvider, AnnouncementBarProvider, DocSidebarItemsExpandedStateProvider } from '@docusaurus/theme-common/internal';
import { useLocation } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import MarkdocPage from './MarkdocPage';
import type { PropDocContent, PropSidebarItem } from '@docusaurus/plugin-content-docs';
import DocRootLayout from '@theme/DocRoot/Layout';

interface MarkdocPageWrapperProps {
    doc: any;
    metadata: PropDocContent;
}

const CONTENT_API_URL = 'https://umbrella.chris.devspace.lsea4.livelyvideo.tv/api/v1/markdoc'
// const CONTENT_API_URL = 'https://umbrella.dev1.devspace.lsea4.livelyvideo.tv/api/v1/markdoc'

const MarkdocPageWrapper: React.FC<MarkdocPageWrapperProps> = ({ doc, metadata }) => {
    const [content, setContent] = useState(null);
    const location = useLocation();
    const { sidebar } = usePluginData('markdoc-plugin') as { sidebar: PropSidebarItem[] };

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(`${CONTENT_API_URL}?path=${doc.route}`);
                const data = await response.json();
                console.log("MarkdocPageWrapper fetchContent data", data);
                setContent(data);
            } catch (error) {
                console.error('Error fetching document content:', error);
            }
        };

        fetchContent();
    }, [doc.route]);

    // console.log("MarkdocPageWrapper sidebar", sidebar);


    return (

        <HtmlClassNameProvider className={`docs-doc-page docs-version-current`}>
            <DocProvider content={metadata}>
                <AnnouncementBarProvider>
                    <DocSidebarItemsExpandedStateProvider>
                        <ScrollControllerProvider>
                            <DocsSidebarProvider name="markdoc-docs" items={sidebar}>
                                <DocRootLayout>
                                    <MarkdocPage doc={content} path={location.pathname} />
                                </DocRootLayout>
                            </DocsSidebarProvider>
                        </ScrollControllerProvider>
                    </DocSidebarItemsExpandedStateProvider>
                </AnnouncementBarProvider>
            </DocProvider>
        </HtmlClassNameProvider>

    );
};

export default MarkdocPageWrapper;