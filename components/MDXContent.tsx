import React, { ComponentPropsWithoutRef, ReactElement } from 'react';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Callout from './Callout';
import CodeBlock from './CodeBlock';

interface MDXContentProps {
  source: string;
}

const components = {
  Callout,
  pre: (props: ComponentPropsWithoutRef<'pre'>) => {
    const childrenArray = React.Children.toArray(props.children);
    const codeChild = childrenArray.find(
      (child): child is ReactElement<{ className?: string; children?: React.ReactNode }> =>
        React.isValidElement(child) && child.type === 'code'
    );

    const className = codeChild?.props?.className || props.className || '';
    const codeString = typeof codeChild?.props?.children === 'string'
      ? codeChild.props.children
      : undefined;

    return (
      <CodeBlock className={className} codeString={codeString}>
        {props.children}
      </CodeBlock>
    );
  },
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => {
    const text = typeof children === 'string' ? children : String(children);
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    return (
      <h2 id={id} {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => {
    const text = typeof children === 'string' ? children : String(children);
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');
    return (
      <h3 id={id} {...props}>
        {children}
      </h3>
    );
  }
};

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="article-prose">
      <MDXRemote source={source} components={components} />
    </div>
  );
}
