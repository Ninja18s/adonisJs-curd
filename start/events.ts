import Event from '@ioc:Adonis/Core/Event';

Event.on('new:user', (user) => {
    console.log(`thankyou for register with ${user.email}`)
});

Event.on('edit:profile', (data) => {
    console.log(`${data.name}'s profile edited successfully`)
});

Event.on('new:profile', (data) => {
    console.log(`${data.name}'s profile created successfully`)
});