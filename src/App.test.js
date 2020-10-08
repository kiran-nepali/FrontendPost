import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import mockAxios from 'jest-mock-axios';

configure({ adapter: new Adapter() });

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

it('renders correctly',()=>{
  const {queryByTestId} =render(<App />);
  expect(queryByTestId("todobutton")).toBeTruthy()
});

describe('Component (Unit)', () => {
  const wrapper = shallow(<App />);
  describe('togglePostTodo function', () => {
    it('changes in state', () => {
      expect(wrapper.state('postOrTodo')).toBe(false);
      wrapper.instance().togglePostTodo();
      expect(wrapper.state('postOrTodo')).toBe(true);
    });
    test('when button with classname todos is clicked it calls the "togglePostTodo" function', () => {
      const spy = jest.spyOn(wrapper.instance(), 'togglePostTodo');
      wrapper.instance().forceUpdate();
      wrapper.find('.todos').simulate('click');
      expect(spy).toHaveBeenLastCalledWith();
    });
  });
});

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.reset();
}); 

describe('fetchData', () => {
  it('fetches successfully data from an API', () => {
    const usrdata = {
      data:{
        id:1,
        name:"kiran",
        address:"London"
      }
    };
    const wrapper = shallow(<App />);
    mockAxios.get.mockResolvedValue(usrdata);
    wrapper.instance().getUserData().then(res=>{
      expect(wrapper.state('userdata')).toEqual(res.usrdata.data);
    });
  });
 
  it('fetches erroneously data from an API',  () => {
    const errorMessage = 'Network Error';
    const wrapper = shallow(<App />);
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    expect(wrapper.instance().getUserData()).rejects.toThrow(errorMessage);
  });
});