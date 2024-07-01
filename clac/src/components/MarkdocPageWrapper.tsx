// src/components/MarkdocPageWrapper.tsx
import React, { useEffect, useState } from 'react';
import { HtmlClassNameProvider } from '@docusaurus/theme-common';
import { DocProvider, DocsSidebarProvider, ScrollControllerProvider, AnnouncementBarProvider } from '@docusaurus/theme-common/internal';
import { useLocation } from '@docusaurus/router';
import { usePluginData } from '@docusaurus/useGlobalData';
import MarkdocPage from './MarkdocPage';
import type { PropDocContent, PropSidebarItem } from '@docusaurus/plugin-content-docs';

interface MarkdocPageWrapperProps {
    doc: any;
    metadata: PropDocContent;
}

const CONTENT_API_URL = 'https://umbrella.dev1.devspace.lsea4.livelyvideo.tv/api/v1/markdoc'

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
    }, [doc.route, CONTENT_API_URL]);

    console.log("MarkdocPageWrapper doc", doc);
    console.log("MarkdocPageWrapper sidebar", sidebar);
    console.log("MarkdocPageWrapper metadata", metadata);


    if (!content) {
        return <div>Loading...</div>;
    }

    return (
        <HtmlClassNameProvider className={`docs-doc-page docs-version-current`}>
            <DocProvider content={metadata}>
                <AnnouncementBarProvider>
                    <ScrollControllerProvider>
                        <DocsSidebarProvider name="markdoc-docs" items={sidebar}>
                            <MarkdocPage doc={content} path={location.pathname} />
                        </DocsSidebarProvider>
                    </ScrollControllerProvider>
                </AnnouncementBarProvider>
            </DocProvider>
        </HtmlClassNameProvider>
    );
};

export default MarkdocPageWrapper;