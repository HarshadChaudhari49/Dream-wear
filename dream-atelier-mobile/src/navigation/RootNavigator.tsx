import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../shared/tokens";

import { HomeScreen } from "../features/home/screens/HomeScreen";
import { DreamInputScreen } from "../features/dreams/screens/DreamInputScreen";
import { ShowcaseFeedScreen } from "../features/dreams/screens/ShowcaseFeedScreen";
import { MyDreamsScreen } from "../features/dreams/screens/MyDreamsScreen";

const Tab = createBottomTabNavigator();
const DreamsStack = createNativeStackNavigator();

/**
 * Matches PRD Section 5.1's proposed tab bar: Home / Dreams / Explore /
 * My Dreams / Profile. Explore and Profile stacks are intentionally not
 * built out here yet — Home and Dreams are the fully-built reference
 * pattern; follow the same shape to finish the other two.
 */
function DreamsNavigator() {
  return (
    <DreamsStack.Navigator>
      <DreamsStack.Screen name="ShowcaseFeed" component={ShowcaseFeedScreen} options={{ title: "Dreams" }} />
      <DreamsStack.Screen name="DreamInput" component={DreamInputScreen} options={{ title: "Tell us your vision" }} />
      <DreamsStack.Screen name="MyDreams" component={MyDreamsScreen} options={{ title: "My dreams" }} />
    </DreamsStack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.rose,
          tabBarInactiveTintColor: colors.grey,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Dreams" component={DreamsNavigator} />
        {/* Explore and Profile follow the same feature-folder pattern as
            home/ and dreams/ — see architecture doc Section 4.1 */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
