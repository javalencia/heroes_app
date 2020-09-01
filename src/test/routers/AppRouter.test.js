import React from 'react';
import { mount } from 'enzyme';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';

describe('Pruebas en <AppRouter />', () => {

    const contexValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

   test('debe de mostrar el login si no esta autenticado ', () => {
      
        const wrapper = mount( 
            <AuthContext.Provider value={ contexValue }>
                <AppRouter /> 
            </AuthContext.Provider>
        );

        expect( wrapper ).toMatchSnapshot(); 
   });

   test('debe de mostrar el componente de marvel si está autenticado ', () => {


        const contexValue = {
            dispatch: jest.fn(),
            user: {
                name: 'Jhonatan',
                logged: true
            }
        }

         
        const wrapper = mount( 
            <AuthContext.Provider value={ contexValue }>
                <AppRouter /> 
            </AuthContext.Provider>
        );


        expect( wrapper.find('.navbar').exists() ).toBe( true ); 

   });
   
   
    
});
