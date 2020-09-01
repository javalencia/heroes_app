import React from 'react';
import {  mount } from 'enzyme';
import { PrivateRoutes } from '../../routers/PrivateRoutes';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en <PrivateRoutes />', () => {


    const props = {
        location: {
            pathname: '/marvel'
        }
    }

    Storage.prototype.setItem = jest.fn();
    
    test('Debe de mostrarse correctamente si esta autenticado y guardar localstorage', () => {
       
        const wrapper = mount( 
            <MemoryRouter>
                <PrivateRoutes 
                    isAuthenticated={ true } 
                    component={ () => <span>Listo</span> }
                    { ...props }
                /> 
            </MemoryRouter>
        )

        expect( wrapper.find('span').exists() ).toBe( true )
        //valida que el local storage se llame
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');

    });

    test('debe de bloquear el componente si no está autenticado', () => {
        

        const wrapper = mount( 
            <MemoryRouter>
                <PrivateRoutes 
                    isAuthenticated={ false } 
                    component={ () => <span>Listo</span> }
                    { ...props }
                /> 
            </MemoryRouter>
        )

        expect( wrapper.find('span').exists() ).toBe( false )
        //valida que el local storage se llame
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/marvel');
    })
    

  
    

});
