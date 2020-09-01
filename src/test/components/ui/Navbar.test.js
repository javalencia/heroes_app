import React from 'react';
import { mount } from 'enzyme';
import { Navbar } from '../../../componets/ui/Nabvar';
import { AuthContext } from '../../../auth/AuthContext';
import { MemoryRouter, Router } from 'react-router-dom';
import { types } from '../../../types/types';

describe('Pruebas en <Navbar />', () => {

    const historyMock = {
        push: jest.fn(),
        replace: jest.fn(),
        location: {},
        listen: jest.fn(),
        createHref: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user:{
            logged: true,
            name: 'Jhonatan'
        }
    } 
    
    const wrapper = mount(
        <AuthContext.Provider value={ contextValue } >
            <MemoryRouter>
                <Router history={ historyMock }>
                    <Navbar />
                </Router>
            </MemoryRouter>
        </AuthContext.Provider>
    );

    afterEach( () => {
        jest.clearAllMocks();
    });

    test('debe mostrarse correctamente ', () => {
        
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('.text-info').text().trim() ).toEqual('Jhonatan')
    });

    test('debe de llamar el logout y  usar el history', () => {
       
        wrapper.find('button').simulate('click');

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.logout
        });

        expect( historyMock.replace ).toHaveBeenCalledWith('/login')

    });
    
    
    
})
