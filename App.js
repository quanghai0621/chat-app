// Import the screens
import Welcome from './components/Welcome';
import Signup from './components/Signup';
import Login from './components/Login';
import Boiler from './components/Boiler';
import Chat from './components/Chat';


// Import React Navigation
import { createStackNavigator } from 'react-navigation'

// Create the navigator
const navigator = createStackNavigator({
  Welcome: { screen: Welcome },
  Signup: { screen: Signup },
  Login: { screen: Login },
  Boiler: { screen: Boiler },
  Chat: { screen: Chat },
  
});


// Export it as the root component
export default navigator