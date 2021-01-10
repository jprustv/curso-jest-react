import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';
import { wrap } from 'module';

Enzyme.configure({ adapter: new EnzymeAdapter() });

 /**
  * Factory function to create a ShallowWrapper for the App component.
  * @function setup
  * @param {object} props - Component props specific to this setup.
  * @returns {ShallowWrapper}
  */
const setup = (props={}) => {
  return shallow(<App { ...props }/>)
}

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test c1scoL0ve!
 * 
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('counter starts at 0', () => {
  const wrapper = setup();
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("0");  // do this first with an integer and show failure!
});

test('counter increments when increment button is clicked', () => {
  const wrapper = setup();
  
  // find button and click
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  // check the counter
  const count = findByTestAttr(wrapper, 'count').text();
  expect(count).toBe("1");
});

test ('renders decrement button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'decrement-button')
  expect(button.length).toBe(1)
})

test ('counter decrements when decrement button is clicked', () => {
  const wrapper = setup()

  const incButton = findByTestAttr(wrapper, 'increment-button')
  incButton.simulate('click')

  const decButton = findByTestAttr(wrapper, 'decrement-button')
  decButton.simulate('click')

  const count = findByTestAttr(wrapper, 'count').text()

  expect(count).toBe('0')
})

test ('counter never gets below 0', () => {
  const wrapper = setup()

  const button = findByTestAttr(wrapper, 'decrement-button')
  button.simulate('click')

  const count = parseInt(findByTestAttr(wrapper, 'count').text())
  expect(count).toBeGreaterThan(-1)
})

test ('error message is displayed if trying to go below 0' , () => {
  const wrapper = setup()

  const button = findByTestAttr(wrapper, 'decrement-button')
  button.simulate('click', {
    target : {
      value : '0'
    }
  })

  const errorMsg = findByTestAttr(wrapper, 'error-msg')
  expect(errorMsg.length).toBe(1)

})

test ('error message is removed if increment is clicked', () => {
  const wrapper = setup()

  const button = findByTestAttr(wrapper, 'increment-button')
  button.simulate('click')

  const errorMsg = findByTestAttr(wrapper, 'error-msg')
  expect(errorMsg.length).toBe(0)
})