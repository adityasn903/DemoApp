/*
export default function ({ store, error }) {

    if(process.client){
    	store.dispatch('initAuth');
        if(!store.state.token){
        	error({
        		message:"oops! please login",
        		statusCode:403
        	})
        }
    }
  }*/

export default function ({ store, error }) {

    if (!store.state.authUser) {
      error({
        message: 'You are not connected ',
        statusCode: 403
      })
    }
  }
  
  