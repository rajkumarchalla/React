
import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme';
import Progress from '../Progress'
import App from '../App';
import ExampleButton from '../ExampleButton';
import {create} from 'react-test-renderer';
import 'jest-styled-components';
import styled from 'styled-components'
import Users from '../Users';

/* FrontEndSDK TDD 
* 
* Jest API :- https://jestjs.io/docs/en/configuration
              The Jest API focusses more on the ability to define tests, make assertions, and create mocks.
* describe: defines a test suite.
* it: defines a test.
* beforeEach: defines an entry hook before running each test.
* expect: makes an assertion.
* jest.fn(): creates a mock function.
* toEqual: checks if two objects have the same value.
* toBe: checks if two objects have the same value and type.
* toBeDefined: checks if the object is defined.
* toContain: checks if an item is present in a list.
* toBeCalled: checks if a mock function is called.
*
*----------------------
* Enzyme :- It provides a mechanism to mount and traverse React.js component trees. 
          It will help us get access to its own properties and state as well as its children props in order to run our assertions.
          Ref: https://airbnb.io/enzyme/

* Enzyme API focusses on rendering the react component and retrieving specific nodes from the rendered tree. There are three ways to render a component.
* shallow: renders only the component under test. Dependent components are not rendered.
* mount: mounts the full component in JSDOM.
* render: renders the component as static HTML.
*
*----------There are several methods to retrieve nodes from the rendered component.
*
* find: accepts a selector and retrieves nodes that match the selector.
* findWhere: retrieve nodes selected by the predicate.
* some: returns true if there is at-least one node matching the selector.
* someWhere: returns true if there is at-least one node selected by the predicate.
* first: returns the first node of a set.
* at: returns the nth node of a set.
* html: gets the HTML of the node.
* text: gets the text representation of the node.
*
*-----------There are more methods to interact with the component and retrieve the component state.
*
* simulate: simulates an event.
* setProps: sets the props.
* setState: sets the state.
* setContext: sets the context.
* prop(key): retrieves prop value corresponding to the provided key.
* state(key): retrieves state corresponding to the provided key.
* context(key): retrieves context value corresponding to the provided key.
*
*/

describe('TestCase#1 : Should check App Title ', function () {
    it('App\'s title should be React Test Case Sample', function () {
        let app = shallow(<App />);
        expect(app.find('h1').text()).toEqual(' Front-End-SDK TDD ');
    });
});

describe("TestCase#2 : Progress Component Rendering tests", () => {
    it('renders without crashing', () => {
        const div = document.createElement('ProgressVL');
        ReactDOM.render(<Progress />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

describe("TestCase#3 :Progress Component Rendering tests", () => {
    //start with most simple test for component render without an error:
    it("TestCase#3 -1 : Should render correctly", () => {
        const component = shallow(<Progress />);
    });

    it("TestCase#3 -2 : Snapshot Test should render initial layout", () => {
        const component = shallow(<Progress />);
        expect(component.getElements()).toMatchSnapshot();
    });
    /** Shallow Rendering */
    it("TestCase#3 -3 : Should render with classname", () => {
        const wrapper = shallow((
            <Progress>
                <div className="progress" />
            </Progress>
        ));
        expect(wrapper.contains(<div className="progress" />)).toEqual(true);
    });

    it('TestCase#3 -4 : Should render with a <div />', () => {
        const wrapper = shallow(<Progress />);
        console.log(wrapper.find('div').length);
        expect(wrapper.find('div').length).toEqual(7);
    });

    it(' TestCase#3 -5 : Should Allows to set props', () => {
        const props = {
            color: ''
        },
            wrapper = mount(<Progress {...props} color='' />);
        wrapper.setProps({ color: 'pcolor' });
        console.log(wrapper.prop('color'));
        expect(wrapper.props().color).toEqual('pcolor');
    });

    it('TestCase#3 -6 :Check the title of progress', () => {
        const props = {
            title: ''
        },
            ProgressComponent = mount(<Progress {...props} title="GV" />);
        console.log(ProgressComponent.prop('title'));
        expect(ProgressComponent.prop('title')).toBe('GV');
    });

    it('TestCase#3 -7 :Check render value with empty', () => {
        const props = {
            value: null
        },
            ProgressComponent = mount(<Progress {...props} />);
        expect((ProgressComponent).prop('value')).toEqual(null);
    });

    it('TestCase#3 -8 :Check the value of progress', () => {
        const props = {
            value: ''
        },
            ProgressComponent = mount(<Progress {...props} value={20} />);
        console.log(ProgressComponent.prop('value'));
        expect(ProgressComponent.prop('value')).toEqual(20);
    });

});
describe('TestCase#4 : Test Button click event', () => {

    it('TestCase#4 -1 OnClick ()', () => {
        // here rather than just testing the output we can create a mock function with jest.fn(). 
        //use Mock jest.fn(), the behavior of a function that is called indirectly by some other code. 
        const mockCallBack = jest.fn();
        const button = shallow((<ExampleButton onClick={mockCallBack}>Ok!</ExampleButton>));
        button.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });

    function CallBack() {
        this.calls = 0;
        this.name = "InfotraxVL";
    }
    CallBack.prototype.fn = function () {
        return () => this.calls++;
    }
    it('TestCase#4 -2 : Test Button onclick function callback', () => {
        const callBack = new CallBack();
        const mockCallBack = callBack.fn();
        const button = shallow((<ExampleButton onClick={mockCallBack}>Ok!</ExampleButton>));
        button.find('button').simulate('click');
        expect(callBack.calls).toEqual(1);
        expect(callBack.name).toEqual("InfotraxVL");
    });

    function drinkAll(callback, flavour) {
        if (flavour !== 'orange') {
            callback(flavour);
        }
    }
    it('TestCase#4 -3 : Should call start userFlavour on button click', () => {
        const userFlavour = jest.fn(() => { console.log(true) });
        const wrapper = shallow(<ExampleButton onClick={userFlavour} />);
        wrapper.find('button').at(0).simulate('click'); // at- current node of index 
        drinkAll(userFlavour, 'lemon');
        expect(userFlavour).toHaveBeenCalled(); //to ensure that a mock function got called.
        console.log(userFlavour()); 
        drinkAll(userFlavour, 'orange');
       //  expect(userFlavour).not.toHaveBeenCalled();
    });

});

describe('TestCase#5 : Get Data from API', () => {
it("shows a list of users from API", async () => {
    const component = create(<Users />);
    const instance = component.getInstance();
    await instance.componentDidMount();
    console.log(instance.state);
});
});

