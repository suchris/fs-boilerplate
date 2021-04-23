Great job, Christine! Your app works really well.

One area of feedback is that it's inefficient to include all the students when you get all the campuses and vice versa. It makes handling the data on the front end a lot more complex. It creates a lot of extra steps with no clear benefit. It's fine to include the students when you're getting information about a specific campus, but otherwise it's redundant.

Initializing parts of your state in both redux and react as undefined can lead to bugs, particularly type errors. For example, if something goes wrong and selectedStudent is undefined, and you try to access a property, it throws a type error which could break your code, as opposed to trying to access the property of an empty object which would then give you an undefined value.

Otherwise, you've done a really amazing job! I've left some comments in the various files throughout your repo. 
