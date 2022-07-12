import React from 'react';
import Order from './order';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });
import { shallow, mount, render } from 'enzyme';

describe('Order component', function() {
  it('should render without throwing an error', function() {
    const wrapper = shallow(<Order />);
    expect(wrapper.text()).toEqual('Ordenar porOrden alfabeticoPesoAlturaAñosAscDesc');
  });

  it('should be selectable by class "content"', function() {
    expect(shallow(<Order />).is('.content')).toBe(true);
  });

  it('should mount in a full DOM', function() {
    expect(mount(<Order />).find('#order').length).toBe(1);
  });

  it('should render to static HTML', function() {
    expect(render(<Order />).text()).toEqual('Ordenar porOrden alfabeticoPesoAlturaAñosAscDesc');
  });
});