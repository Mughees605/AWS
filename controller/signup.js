function signup(event, context){
  let { email, password } = event.body;
  if(email){
    context.succeed({
        statusCode : 0,
        statusDesc : email
    })
  }
  else{
      context.succeed({
          statusCode: 1,
          statusDesc : 'no email in body'
      })
  }
}


exports.signup = signup;