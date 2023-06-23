import { useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";

const { height, width } = Dimensions.get("window");

const data = [
  {
    id: 1,
    image:
      "https://i.pinimg.com/564x/0a/15/b2/0a15b2185dcb364d9096a14c7e3913b0.jpg",
    title: "Image 1",
  },
  {
    id: 2,
    image:
      "https://i.pinimg.com/564x/66/08/ed/6608edd14a7ae11295414096d8403d3b.jpg",
    title: "Image 2",
  },
  {
    id: 3,
    image:
      "https://i.pinimg.com/564x/6a/f1/56/6af15652f2d54f26bfdb38a05ccf823f.jpg",
    title: "Image 3",
  },
  {
    id: 4,
    image:
      "https://i.pinimg.com/564x/c7/89/9d/c7899dc6411270ff017e2176a9c6b6d1.jpg",
    title: "Image 4",
  },
];

export default function App() {
  const scrollAnimation = useRef(new Animated.Value(0)).current;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="default" />
      <Animated.FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollAnimation } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          const inputRange = [
            width * (index - 0.5),
            width * index,
            width * (index + 0.5),
          ];

          return (
            <View style={styles.item}>
              <Animated.Image
                source={{ uri: item.image }}
                style={[
                  styles.image,
                  {
                    transform: [
                      {
                        translateX: scrollAnimation.interpolate({
                          inputRange: [
                            width * (index - 1),
                            width * index,
                            width * (index + 1),
                          ],
                          outputRange: [-width * 0.5, 0, width * 0.5],
                        }),
                      },
                    ],
                  },
                ]}
              />
              <Animated.View
                style={[
                  styles.containerTitle,
                  {
                    opacity: scrollAnimation.interpolate({
                      inputRange,
                      outputRange: [0, 1, 0],
                    }),
                    transform: [
                      {
                        translateX: scrollAnimation.interpolate({
                          inputRange,
                          outputRange: [250, 0, -250],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.title}>{item.title}</Text>
              </Animated.View>
              <Animated.View
                style={[StyleSheet.absoluteFillObject, styles.itemOverlay]}
              />
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height,
    width,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width,
    height,
    resizeMode: "cover",
  },
  containerTitle: {
    position: "absolute",
    bottom: 80,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  itemOverlay: {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});
