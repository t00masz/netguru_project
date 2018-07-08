import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import ReactApp from '../src/reactApp'

test('should render', () => {
    const renderer = new ReactShallowRenderer();
    renderer.render(<ReactApp />);
    expect((renderer.getRenderOutput())).toMatchSnapshot();
}) 
