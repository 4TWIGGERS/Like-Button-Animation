import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolate,
  interpolateColor,
  withDelay,
  useDerivedValue,
  useAnimatedProps,
  Easing,
} from "react-native-reanimated";

import { View, Pressable, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";

const AnimatedButton = Animated.createAnimatedComponent(Pressable);

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const peachColor = "#F97777";

export default function AnimatedStyleUpdateExample(props) {
  const scale = useSharedValue(0);

  const circle = useSharedValue(0);

  const like = useSharedValue(1);

  const liked = useSharedValue(0);

  const xAxisFingerMotion = useSharedValue(75);

  const yAxisFingerMotion = useSharedValue(54);

  const fakeView = useSharedValue(1);

  const reunion = useSharedValue(0);

  const path = useDerivedValue(() => {
    return `M43 54 56 54A1 1 0 0156 61 1 1 0 0155 68 1 1 0 0154 75C58 75 57 81 53 81L34 81Q27 78 27 70L27 58Q28 56 31 53  ${xAxisFingerMotion.value} ${yAxisFingerMotion.value} 41 54l9 0`;
  });

  const pathProps = useAnimatedProps(() => {
    return {
      d: path.value,
    };
  });

  const containerScaleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(scale.value, [0, 1], [1, 0.95]),
        },
      ],
    };
  });

  const circleStyle = useAnimatedStyle(() => {
    return {
      zIndex: 5,
      opacity: interpolate(circle.value, [0, 1], [0, 1]),
      transform: [{ scale: interpolate(circle.value, [0, 1], [0, 1.5]) }],
    };
  });
  const styleLike = useAnimatedStyle(() => {
    return {
      color: interpolateColor(circle.value, [0, 1], [peachColor, "white"]),
      opacity: interpolate(like.value, [0, 1], [0, 1]),
    };
  });
  const styleLiked = useAnimatedStyle(() => {
    return {
      zIndex: 6,
      color: interpolateColor(circle.value, [0, 1], [peachColor, "white"]),
      opacity: interpolate(liked.value, [0, 1], [0, 1]),
    };
  });

  const fakeViewStyle = useAnimatedStyle(() => {
    return {
      right: 0,
      opacity: interpolate(fakeView.value, [0, 1], [0, 1]),
    };
  });
  const reunionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(reunion.value, [0, 1], [-1, 39]),
        },
      ],
    };
  });

  const _onPress = () => {
    fakeView.value = withTiming(0);
    scale.value = withTiming(1, {}, () => {
      scale.value = withTiming(0);
    });

    liked.value = withDelay(1100, withTiming(1));
    like.value = withDelay(560, withTiming(0));
    xAxisFingerMotion.value = withDelay(250, withTiming(50, { duration: 300 }));
    yAxisFingerMotion.value = withDelay(250, withTiming(35, { duration: 300 }));
    reunion.value = withTiming(
      1,
      { duration: 700, easing: Easing.bezier(0.82, -1.45, 0.78, 1.95) },
      () => {
        circle.value = withTiming(1, { duration: 600 });
      }
    );
  };

  return (
    <View style={styles.container}>
      <AnimatedButton
        onPress={_onPress}
        style={[styles.button, containerScaleStyle]}
      >
        <Animated.Text style={[styles.like, styleLike]}>Like</Animated.Text>
        <Animated.Text style={[styles.liked, styleLiked]}>Liked</Animated.Text>
        <Animated.View style={[styles.circle, circleStyle]} />
        <Animated.View style={styles.svgStyle1}>
          <AnimatedSvg style={[styles.svgStyle1, reunionStyle]}>
            <AnimatedPath animatedProps={pathProps} fill={"#F97777"} />
          </AnimatedSvg>
        </Animated.View>
        <Animated.View style={styles.svgStyle2}>
          <AnimatedSvg style={[styles.svgStyle2, reunionStyle]}>
            <AnimatedPath animatedProps={pathProps} fill={"#F97777"} />
          </AnimatedSvg>
        </Animated.View>
        <Animated.View style={[styles.fake, fakeViewStyle]} />
        <Animated.View style={[styles.fake, { left: 0 }, fakeViewStyle]} />
      </AnimatedButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFEEF0",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 210,
    height: 80,
    backgroundColor: "white",
    borderRadius: "15",
    overflow: "hidden",
  },
  like: {
    fontWeight: "700",
    fontSize: 31,
    position: "absolute",
    zIndex: 2,
  },
  liked: {
    color: "white",
    fontWeight: "700",
    fontSize: 31,
    position: "absolute",
    zIndex: 2,
  },
  circle: {
    backgroundColor: "#F97777",
    position: "absolute",
    width: 200,
    height: 200,
    borderRadius: "1000",
  },
  svgStyle1: {
    width: 70,
    height: 130,
    right: 0,
    position: "absolute",
    zIndex: 3,
    transform: [{ scaleX: -1 }],
  },
  svgStyle2: {
    position: "absolute",
    left: 0,
    width: 70,
    height: 130,
    zIndex: 3,
  },
  fake: {
    width: 70,
    height: 130,
    position: "absolute",
    backgroundColor: "white",
    zIndex: 4,
  },
});
