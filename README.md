# **101 Application testing (React)**

This repo is created to give you a basic understanding why you should implement unit testing in your react App, by giving you some basic concepts and practical example.


### **What is testing ?**
A process to ensure that our application functionality is running as our expected. **(bug free)**

### **Why do we testing ?**

- Building confidence in our code
- Code documentations of applications flow
- Bugs and Regression prevention

### **Potential drawbacks**

- Writing tests is time consuming and difficult.
- In certain scenarios executing tests in CI can cost actual money.
- If done incorrectly, it can give you false positives. Your tests pass, but your app doesn’t function as intended.
- Or false negatives. Your tests fail but your app is functioning as intended.

### Levels **of testing**
##### **Unit test (single unit testing)**
Ensures that each part of the code delivers the expected result
- **Function**
    Logic testing of our single function (give output then expect the result)
- **Snapshoot**
    A snapshot test makes sure that the user interface (UI) of a web application does not change unexpectedly. It captures the code of a component at a moment in time, so that we can compare the component in one state with any other possible state it might take. Rules for snashot is using for UI that not often changes and not complex

- **Component**
    Expect component to render / doing something base on our expectation 

##### **Integration Test (Behavior testing)**
 Integration testing is performed to test individual components to check how they function together. In other words, it is performed to test the modules which are working fine individually and do not show bugs when integrated.

##### **End To End Test (All flow testing)**
Testing method that involves testing an application’s workflow from beginning to end. 

### **Implementation**

##### **TDD**
Create testing first then do code until the testing is passed

- **Leads to better application design**
 By writting test case first, we already know what to do and have reason about our code

- **Code simplify and time saving** **(less code)**
Reduce uneeded code because we are focusing on solving test case not the code bug and it's saving time because no need to manual testing, and write test case after we tired of coding.  

    | TDD | NO TDD |
    | ------ | ------ |
    | Code ⇒ manual test ⇒ error ⇒ code ⇒ manual test ⇒ error ⇒ done ⇒ unit test | Test Case ⇒ error ⇒ code ⇒ error ⇒ code ⇒ done  |
   
      
### What should we test ?
- **Test Render / Result**
Test what you expect the component to render or function to return.
If you are rendering a custom `Button` component and you pass a `color` prop with a value of `red` you should test that. This will also give you confidence that your component meet the design requirements.

- **Test actions**
For example if you expect something to happen when you click or hover over a button test 
            
### **Last Step:** **Best Practices**
[https://github.com/goldbergyoni/javascript-testing-best-practices](https://github.com/goldbergyoni/javascript-testing-best-practices#section-1-the-test-anatomy-1)
[https://kentcdodds.com/blog/testing-implementation-details/](https://kentcdodds.com/blog/testing-implementation-details/)
[https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-screen](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library#not-using-screen)
