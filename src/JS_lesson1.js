const users1 = {
    // #12345
    id: 1,
    name: 'Bob',
    isStudent: true,
    };
    
    const {id, name, role = 'main'} = users1;
    console.log(id, role);