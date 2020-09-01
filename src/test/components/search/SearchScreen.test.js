import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../componets/search/SearchScreen';

describe('Pruebas en el <SearchScreen />', () => {

    test('Debe de mostrarse correctamente con valores por defecto', () => {

        const wrapper = mount(
            <MemoryRouter  initialEntries={['/search']} >
               <Route 
                 path="/search" 
                 component={ SearchScreen } 
                />
            </MemoryRouter>
        );


        expect( wrapper ).toMatchSnapshot();

        expect( wrapper.find('.alert-info').text().trim() ).toEqual('Search Superhero');

    });


    test('Debe de mostar a batman y el input con el valor del Query String', () => {
       
        const wrapper = mount(
            <MemoryRouter  initialEntries={['/search?q=batman']} >
               <Route 
                 path="/search" 
                 component={ SearchScreen } 
                />
            </MemoryRouter>
        );

        expect( wrapper.find('input').prop('value') ).toEqual( 'batman' )
        expect( wrapper ).toMatchSnapshot();

    });

    test('debe de mostrar un error si no se encuentra el hero', () => {
        

        const q = 'batman123456'

        const wrapper = mount(
            <MemoryRouter  initialEntries={[`/search?q=${ q }`]} >
               <Route 
                 path="/search" 
                 component={ SearchScreen } 
                />
            </MemoryRouter>
        );

        expect( wrapper.find('.alert-danger').text().trim() ).toEqual(`There is not hero with ${ q }`);
    });

    test('debe de llamar el push del history', () => {
       
        const history = { 
            push: jest.fn()
            
        }

        const wrapper = mount(
            <MemoryRouter  initialEntries={[`/search?q=batman123`]} >
               <Route 
                 path="/search" 
                 component={() =>  <SearchScreen history={ history } /> } 
                />
            </MemoryRouter>
        );

        wrapper.find('input').simulate('change', {
            target:{
                name: 'searchText',
                value: 'batman'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( history.push ).toHaveBeenCalledWith(`?q=batman`)


    });
    
    
    
    
  
});
