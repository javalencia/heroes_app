import React from 'react';
import { mount } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../componets/login/LoginScreen';
import { types } from '../../../types/types';

describe('Pruebas en el LoginScreen', () => {

    const contextValue = {
        user:{
            logged: false
        },
        dispatch: jest.fn()
    }

    const history = {
        replace: jest.fn(),

    }

    const wrapper  = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history={ history }/>
        </AuthContext.Provider>
    )

    test('debe de mostrarse correctamente', () => {
        

        expect( wrapper ).toMatchSnapshot()

    });

    test('debe de realizar el dispatch y la navegación  ', () => {

        const handleClick = wrapper.find('button').prop('onClick');

        handleClick();

        expect( contextValue.dispatch ).toHaveBeenLastCalledWith({
            type: types.login,
            payload: {
                name: 'Jhonatan'
            }
        });

        expect( history.replace ).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath', '/dc');
        handleClick();

        expect( history.replace ).toHaveBeenCalledWith('/dc');


        
    });
    
    
    
})
