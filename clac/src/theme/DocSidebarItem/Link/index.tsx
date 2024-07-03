/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { isActiveSidebarItem } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import type { Props } from '@theme/DocSidebarItem/Link';

import styles from './styles.module.css';

export default function DocSidebarItemLink({
    item,
    onItemClick,
    activePath,
    level,
    index,
    ...props
}: Props): JSX.Element {
    const { href, label, className, autoAddBaseUrl } = item;
    // const isActive = isActiveSidebarItem(item, activePath);
    const isActive = item.href === activePath;
    const isInternalLink = isInternalUrl(href);
    console.log('DocSidebarItemLink props:', { item, onItemClick, activePath, level, index, ...props, isActive });
    // if (isActive) {
    //     console.log('---------------')
    //     console.log('ACTIVE DocSidebarItemLink props:', { item, onItemClick, activePath, level, index, ...props, isActive });
    //     console.log('---------------')
    // }
    return (
        <li
            className={clsx(
                ThemeClassNames.docs.docSidebarItemLink,
                ThemeClassNames.docs.docSidebarItemLinkLevel(level),
                'menu__list-item',
                className,
            )}
            key={label}>
            {/* <a href={href}>{label}</a> */}
            <Link
                className={clsx(
                    'menu__link',
                    !isInternalLink && styles.menuExternalLink,
                    {
                        'menu__link--active': isActive,
                    },
                )}
                autoAddBaseUrl={autoAddBaseUrl}
                aria-current={isActive ? 'page' : undefined}
                to={href}
                href={href}
                {...(isInternalLink && {
                    onClick: onItemClick ? () => onItemClick(item) : undefined,
                })}
                {...props}>
                {label}
                {!isInternalLink && <IconExternalLink />}
            </Link>
        </li>
    );
}