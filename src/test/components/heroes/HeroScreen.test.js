import React from 'react';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../componets/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <HeroScreen /> ', () => {

    const history =  {
        length: 10,
        push:   jest.fn(),
        goBack: jest.fn()
    }
    
    const wrapper = mount(
        <MemoryRouter initialEntries={['/hero']}>
            <HeroScreen  history={ history } />
        </MemoryRouter>
    );


    test('Debe de mostrar el componente redirect si no hay argumentos en el URL', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen  history={ history } />
            </MemoryRouter>
        );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('Redirect').exists() ).toBe( true );
        
    });


    test('debe de mostrar un hero si el párametro existe y se encuentra', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                 <Route  path="/hero/:heroId" component={ HeroScreen }  />
            </MemoryRouter>
        );

        expect( wrapper.find('.row').exists() ).toBe( true );
    });

    test('debe de regresar a la pantalla anterior con un PUSH', () => {
        const history =  {
            length: 1,
            push:   jest.fn(),
            goBack: jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                 <Route  
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={ history } />}  />
            </MemoryRouter>
        );


        wrapper.find('button').simulate('click')

        expect( history.push ).toHaveBeenCalledWith('/')
        expect( history.goBack ).not.toHaveBeenCalled()


    });

    test('debe de llamarse el goBack', () => {
    
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                 <Route  
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={ history } />}  />
            </MemoryRouter>
        );


        wrapper.find('button').simulate('click')

        expect( history.goBack ).toHaveBeenCalled()
        expect( history.push ).not.toHaveBeenCalled()
    });
    

    test('debe de llamar el REdirect si el hero no existe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider12121252']}>
                 <Route  
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={ history } />}  />
            </MemoryRouter>
        );

        expect(wrapper.text()).toEqual('')        
    });
    
    
    
    
});
