export function useMDXComponents(components) {
  return {
    h1: (props) => <h1 {...props} />,
    h2: (props) => <h2 {...props} />,
    h3: (props) => <h3 {...props} />,
    p: (props) => <p {...props} />,
    a: (props) => <a {...props} />,
    ul: (props) => <ul {...props} />,
    ol: (props) => <ol {...props} />,
    li: (props) => <li {...props} />,
    code: (props) => <code {...props} />,
    pre: (props) => <pre {...props} />,
    ...components,
  }
}
