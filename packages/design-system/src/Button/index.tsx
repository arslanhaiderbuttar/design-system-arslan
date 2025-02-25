import React from "react";
import _ from "lodash";
import styled, { css } from "styled-components";
import { hexToRgba } from "Common/index";
import { Variant } from "Constants/variants";
import { CommonComponentProps } from "Types/common";
import { Classes } from "Constants/classes";
import Icon, { IconName, IconSize } from "Icon";
import Spinner from "Spinner";
import { typography } from "Constants/typography";

const smallButton = css`
  font-size: ${typography.btnSmall.fontSize}px;
  font-weight: ${typography.btnSmall.fontWeight};
  line-height: ${typography.btnSmall.lineHeight}px;
  letter-spacing: ${typography.btnSmall.letterSpacing}px;
`;

const mediumButton = css`
  font-size: ${typography.btnMedium.fontSize}px;
  font-weight: ${typography.btnMedium.fontWeight};
  line-height: ${typography.btnMedium.lineHeight}px;
  letter-spacing: ${typography.btnMedium.letterSpacing}px;
`;

const largeButton = css`
  font-size: ${typography.btnLarge.fontSize}px;
  font-weight: ${typography.btnLarge.fontWeight};
  line-height: ${typography.btnLarge.lineHeight}px;
  letter-spacing: ${typography.btnLarge.letterSpacing}px;
`;

export enum Category {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
}

export enum Size {
  xxs = "xxs",
  xs = "xs",
  small = "small",
  medium = "medium",
  large = "large",
}

type stateStyleType = {
  bgColorPrimary: string;
  borderColorPrimary: string;
  txtColorPrimary: string;
  bgColorSecondary: string;
  borderColorSecondary: string;
  txtColorSecondary: string;
  bgColorTertiary: string;
  borderColorTertiary: string;
  txtColorTertiary: string;
};

type BtnColorType = {
  bgColor: string;
  txtColor: string;
  border: string;
};

type BtnFontType = {
  buttonFont: any;
  padding: string;
  height: number;
};

export enum IconPositions {
  left = "left",
  right = "right",
}

export type ButtonProps = CommonComponentProps & {
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  text?: string;
  category?: Category;
  variant?: Variant;
  className?: string;
  icon?: IconName;
  size?: Size;
  fill?: boolean;
  href?: string;
  tabIndex?: number;
  tag?: "a" | "button";
  type?: "submit" | "reset" | "button";
  target?: string;
  height?: string;
  width?: string;
  isLink?: boolean;
  iconPosition?: IconPositions;
};

const defaultProps = {
  category: Category.primary,
  variant: Variant.info,
  size: Size.small,
  isLoading: false,
  disabled: false,
  fill: undefined,
  tag: "a",
};

type buttonVariant = {
  main: string;
  light: string;
  dark: string;
  darker: string;
  darkest: string;
};

type ButtonColorType = {
  [index: string]: buttonVariant;
};

const ButtonColors: ButtonColorType = {
  info: {
    main: "var(--ads-color-orange-500)",
    light: "var(--ads-old-color-hot-cinnamon)",
    dark: "var(--ads-old-color-rock-spray)",
    darker: "var(--ads-old-color-bridesmaid)",
    darkest: "var(--ads-old-color-pot-pourri)",
  },
  success: {
    main: "var(--ads-old-color-jade)",
    light: "var(--ads-old-color-fun-green)",
    dark: "var(--ads-old-color-fun-green-2)",
    darker: "var(--ads-old-color-granny-apple)",
    darkest: "var(--ads-old-color-foam)",
  },
  warning: {
    main: "var(--ads-old-color-sun)",
    light: "var(--ads-old-color-yellow-sea)",
    dark: "var(--ads-old-color-yellow-sea)",
    darker: "var(--ads-old-color-champagne)",
    darkest: "var(--ads-old-color-early-dawn)",
  },
  danger: {
    main: "var(--ads-old-color-pomegranate)",
    light: "var(--ads-old-color-milano-red)",
    dark: "var(--ads-old-color-milano-red-2)",
    darker: "var(--ads-old-color-cinderella)",
    darkest: "var(--ads-old-color-fair-pink)",
  },
  tertiary: {
    main: "var(--ads-old-color-mid-gray)",
    light: "var(--ads-old-color-gray-10)",
    dark: "var(--ads-color-black-5)",
    darker: "var(--ads-old-color-gallery)",
    darkest: "var(--ads-color-black-450)",
  },
};

const getDisabledStyles = (props: ButtonProps) => {
  const variant = props.variant || defaultProps.variant;
  const category = props.category || defaultProps.category;

  if (props.isLink) {
    return {
      bgColorPrimary: "transparent",
      borderColorPrimary: "transparent",
      txtColorPrimary: "var(--ads-old-color-gray-7)",
      bgColorSecondary: "transparent",
      borderColorSecondary: "transparent",
      txtColorSecondary: "var(--ads-old-color-gray-7)",
      bgColorTertiary: "transparent",
      borderColorTertiary: "transparent",
      txtColorTertiary: "var(--ads-old-color-gray-7)",
    };
  }
  const stylesByCategory = {
    [Category.primary]: {
      txtColorPrimary: "var(--ads-old-color-gray-7)",
      bgColorPrimary: ButtonColors[variant].darker,
      borderColorPrimary: ButtonColors[variant].darker,
    },
    [Category.secondary]: {
      txtColorSecondary: "var(--ads-old-color-gray-7)",
      bgColorSecondary: ButtonColors[variant].darker,
      borderColorSecondary: props.isLoading
        ? ButtonColors[variant].darkest
        : ButtonColors.tertiary.darker,
    },
    [Category.tertiary]: {
      txtColorTertiary: "var(--ads-old-color-gray-7)",
      bgColorTertiary: ButtonColors.tertiary.dark,
      borderColorTertiary: props.isLoading
        ? ButtonColors.tertiary.darkest
        : ButtonColors.tertiary.darker,
    },
  };

  return stylesByCategory[category];
};

const getMainStateStyles = (props: ButtonProps) => {
  const variant = props.variant || defaultProps.variant;
  const category = props.category || defaultProps.category;

  if (props.isLink) {
    return {
      bgColorPrimary: "transparent",
      borderColorPrimary: "transparent",
      txtColorPrimary: "var(--ads-color-black-550)",
      bgColorSecondary: "transparent",
      borderColorSecondary: "transparent",
      txtColorSecondary: "var(--ads-color-black-550)",
      bgColorTertiary: "transparent",
      borderColorTertiary: "transparent",
      txtColorTertiary: "var(--ads-color-black-550)",
    };
  }
  const stylesByCategory = {
    [Category.primary]: {
      bgColorPrimary: ButtonColors[variant].main,
      borderColorPrimary: ButtonColors[variant].main,
      txtColorPrimary: "var(--ads-color-black-0)",
    },
    [Category.secondary]: {
      borderColorSecondary: ButtonColors[variant].main,
      txtColorSecondary: ButtonColors[variant].main,
      bgColorSecondary: "transparent",
    },
    [Category.tertiary]: {
      bgColorTertiary: "transparent",
      borderColorTertiary: ButtonColors.tertiary.darker,
      txtColorTertiary: ButtonColors.tertiary.main,
    },
  };

  return stylesByCategory[category];
};

const getHoverStateStyles = (props: ButtonProps) => {
  const variant = props.variant || defaultProps.variant;
  const category = props.category || defaultProps.category;

  if (props.isLink) {
    return {
      bgColorPrimary: "transparent",
      borderColorPrimary: "transparent",
      txtColorPrimary: "var(--ads-old-color-gray-10)",
      bgColorSecondary: "transparent",
      borderColorSecondary: "transparent",
      txtColorSecondary: "var(--ads-old-color-gray-10)",
      bgColorTertiary: "transparent",
      borderColorTertiary: "transparent",
      txtColorTertiary: "var(--ads-old-color-gray-10)",
    };
  }

  const stylesByCategory = {
    [Category.primary]: {
      bgColorPrimary: ButtonColors[variant].dark,
      borderColorPrimary: ButtonColors[variant].dark,
      txtColorPrimary: "var(--ads-color-black-0)",
    },
    [Category.secondary]: {
      bgColorSecondary: hexToRgba(ButtonColors[variant].main, 0.1),
      txtColorSecondary: ButtonColors[variant].main,
      borderColorSecondary: ButtonColors[variant].main,
    },
    [Category.tertiary]: {
      bgColorTertiary: hexToRgba(ButtonColors.tertiary.main, 0.1),
      borderColorTertiary: ButtonColors.tertiary.main,
      txtColorTertiary: ButtonColors.tertiary.main,
    },
  };

  return stylesByCategory[category];
};

const getActiveStateStyles = (props: ButtonProps) => {
  const variant = props.variant || defaultProps.variant;
  const category = props.category || defaultProps.category;

  if (props.isLink) {
    return {
      bgColorPrimary: "transparent",
      borderColorPrimary: "transparent",
      txtColorPrimary: "var(--ads-color-black-750)",
      bgColorSecondary: "transparent",
      borderColorSecondary: "transparent",
      txtColorSecondary: "var(--ads-color-black-750)",
      bgColorTertiary: "transparent",
      borderColorTertiary: "transparent",
      txtColorTertiary: "var(--ads-color-black-750)",
    };
  }
  const stylesByCategory = {
    [Category.primary]: {
      bgColorPrimary: ButtonColors[variant].dark,
      borderColorPrimary: ButtonColors[variant].main,
      txtColorPrimary: "var(--ads-color-black-0)",
    },
    [Category.secondary]: {
      bgColorSecondary: hexToRgba(ButtonColors[variant].main, 0.1),
      txtColorSecondary: ButtonColors[variant].light,
      borderColorSecondary: ButtonColors[variant].light,
    },
    [Category.tertiary]: {
      bgColorTertiary: hexToRgba(ButtonColors.tertiary.main, 0.1),
      borderColorTertiary: ButtonColors.tertiary.light,
      txtColorTertiary: ButtonColors.tertiary.light,
    },
  };

  return stylesByCategory[category];
};

const stateStyles = (props: ButtonProps, stateArg: string): stateStyleType => {
  const styles = {
    bgColorPrimary: "",
    borderColorPrimary: "",
    txtColorPrimary: "",
    bgColorSecondary: "",
    borderColorSecondary: "",
    txtColorSecondary: "",
    bgColorTertiary: "",
    borderColorTertiary: "",
    txtColorTertiary: "",
  };
  const state =
    props.isLoading || props.disabled
      ? "disabled"
      : (stateArg as keyof typeof stylesByState);
  const stylesByState = {
    disabled: getDisabledStyles(props),
    main: getMainStateStyles(props),
    hover: getHoverStateStyles(props),
    active: getActiveStateStyles(props),
  };

  return {
    ...styles,
    ...stylesByState[state],
  };
};

const btnColorStyles = (props: ButtonProps, state: string): BtnColorType => {
  let bgColor = "",
    txtColor = "",
    border = "";
  switch (props.category) {
    case Category.primary:
      bgColor = stateStyles(props, state).bgColorPrimary;
      txtColor = stateStyles(props, state).txtColorPrimary;
      border = `1.2px solid ${stateStyles(props, state).borderColorPrimary}`;
      break;
    case Category.secondary:
      bgColor = stateStyles(props, state).bgColorSecondary;
      txtColor = stateStyles(props, state).txtColorSecondary;
      border = `1.2px solid ${stateStyles(props, state).borderColorSecondary}`;
      break;
    case Category.tertiary:
      bgColor = stateStyles(props, state).bgColorTertiary;
      txtColor = stateStyles(props, state).txtColorTertiary;
      border = `1.2px solid ${stateStyles(props, state).borderColorTertiary}`;
      break;
  }
  return { bgColor, txtColor, border };
};

const getPaddingBySize = (props: ButtonProps) => {
  const paddingBySize = {
    [Size.small]: `0px var(--ads-spaces-3)`,
    [Size.medium]: `0px var(--ads-spaces-7)`,
    [Size.large]: `0px 26px`,
  };
  const paddingBySizeForJustIcon = {
    [Size.small]: `0px var(--ads-spaces-1)`,
    [Size.medium]: `0px var(--ads-spaces-2)`,
    [Size.large]: `0px var(--ads-spaces-3)`,
  };

  const isIconOnly = !props.text && props.icon;
  const paddingConfig = isIconOnly ? paddingBySizeForJustIcon : paddingBySize;

  const iSizeInConfig =
    Object.keys(paddingConfig).indexOf(props.size || "") !== -1;
  const size: any = props.size && iSizeInConfig ? props.size : Size.small;

  return paddingConfig[size as keyof typeof paddingConfig];
};

const getHeightBySize = (props: ButtonProps) => {
  const heightBySize = {
    [Size.small]: 20,
    [Size.medium]: 30,
    [Size.large]: 38,
  };

  const iSizeInConfig =
    Object.keys(heightBySize).indexOf(props.size || "") !== -1;
  const size: any = props.size && iSizeInConfig ? props.size : Size.small;

  return heightBySize[size as keyof typeof heightBySize];
};

const getBtnFontBySize = (props: ButtonProps) => {
  const fontBySize = {
    [Size.small]: smallButton,
    [Size.medium]: mediumButton,
    [Size.large]: largeButton,
  };

  const iSizeInConfig =
    Object.keys(fontBySize).indexOf(props.size || "") !== -1;
  const size: any = props.size && iSizeInConfig ? props.size : Size.small;

  return fontBySize[size as keyof typeof fontBySize];
};

const btnFontStyles = (props: ButtonProps): BtnFontType => {
  const padding = getPaddingBySize(props);
  const height = getHeightBySize(props);
  const buttonFont = getBtnFontBySize(props);

  return { buttonFont, padding, height };
};

const ButtonStyles = css<ButtonProps>`
  user-select: none;
  width: ${(props) =>
    props.width ? props.width : props.fill ? "100%" : "auto"};
  height: ${(props) => props.height || btnFontStyles(props).height}px;
  border: none;
  text-decoration: none;
  outline: none;
  text-transform: uppercase;
  background-color: ${(props) => btnColorStyles(props, "main").bgColor};
  color: ${(props) => btnColorStyles(props, "main").txtColor};
  border: ${(props) => btnColorStyles(props, "main").border};
  border-radius: 0;
  ${(props) => btnFontStyles(props).buttonFont};
  padding: ${(props) => btnFontStyles(props).padding};
  .${Classes.ICON}:not([name="no-response"]) {
    svg {
      fill: ${(props) => btnColorStyles(props, "main").txtColor};
    }
  }
  &:hover,
  &:focus {
    text-decoration: none;
    background-color: ${(props) => btnColorStyles(props, "hover").bgColor};
    color: ${(props) => btnColorStyles(props, "hover").txtColor};
    border: ${(props) => btnColorStyles(props, "hover").border};
    cursor: ${(props) =>
      props.isLoading || props.disabled ? `not-allowed` : `pointer`};
    .${Classes.ICON} {
      fill: ${(props) => btnColorStyles(props, "hover").txtColor};
    }
  }
  font-style: normal;
  &:active {
    background-color: ${(props) => btnColorStyles(props, "active").bgColor};
    color: ${(props) => btnColorStyles(props, "active").txtColor};
    border: ${(props) => btnColorStyles(props, "active").border};
    cursor: ${(props) =>
      props.isLoading || props.disabled ? `not-allowed` : `pointer`};
    .${Classes.ICON} {
      fill: ${(props) => btnColorStyles(props, "active").txtColor};
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .${Classes.SPINNER} {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    circle {
      stroke: var(--ads-old-color-gray-7);
    }
  }
  .t--right-icon {
    margin-left: var(--ads-spaces-1);
  }
  .t--left-icon {
    margin-right: var(--ads-spaces-1);
  }
`;

export const StyledButton = styled("button")`
  ${ButtonStyles}
`;

const StyledLinkButton = styled("a")`
  ${ButtonStyles}
`;

export const VisibilityWrapper = styled.div`
  visibility: hidden;
`;

const IconSizeProp = (size?: Size) => {
  const sizeMapping = {
    [Size.xxs]: IconSize.XXS,
    [Size.xs]: IconSize.XS,
    [Size.small]: IconSize.SMALL,
    [Size.medium]: IconSize.MEDIUM,
    [Size.large]: IconSize.LARGE,
  };

  return size ? sizeMapping[size] : IconSize.SMALL;
};

function TextLoadingState({ text }: { text?: string }) {
  return <VisibilityWrapper>{text}</VisibilityWrapper>;
}

function IconLoadingState({ icon, size }: { size?: Size; icon?: IconName }) {
  return <Icon invisible name={icon} size={IconSizeProp(size)} />;
}

const getIconContent = (props: ButtonProps, rightPosFlag = false) =>
  props.icon ? (
    props.isLoading ? (
      <IconLoadingState {...props} />
    ) : (
      <Icon
        className={rightPosFlag ? "t--right-icon" : "t--left-icon"}
        name={props.icon}
        size={IconSizeProp(props.size)}
      />
    )
  ) : null;

const getTextContent = (props: ButtonProps) =>
  props.text ? (
    props.isLoading ? (
      <TextLoadingState text={props.text} />
    ) : (
      props.text
    )
  ) : null;

const getButtonContent = (props: ButtonProps) => {
  const iconPos = props.iconPosition
    ? props.iconPosition
    : props.tag === "a"
    ? IconPositions.right
    : IconPositions.left;
  return (
    <>
      {iconPos === IconPositions.left && getIconContent(props)}
      <span>{getTextContent(props)}</span>
      {iconPos === IconPositions.right && getIconContent(props, true)}
      {props.isLoading ? <Spinner size={IconSizeProp(props.size)} /> : null}
    </>
  );
};

function ButtonComponent(props: ButtonProps) {
  const omitProps = ["fill"];
  return (
    <StyledButton
      className={props.className}
      data-cy={props.cypressSelector}
      {..._.omit(props, omitProps)}
      onClick={(e: React.MouseEvent<HTMLElement>) =>
        props.onClick && !props.isLoading && props.onClick(e)
      }
    >
      {getButtonContent(props)}
    </StyledButton>
  );
}

function LinkButtonComponent(props: ButtonProps) {
  return (
    <StyledLinkButton
      className={props.className}
      data-cy={props.cypressSelector}
      href={props.href}
      {...props}
      onClick={(e: React.MouseEvent<HTMLElement>) =>
        props.onClick && props.onClick(e)
      }
    >
      {getButtonContent(props)}
    </StyledLinkButton>
  );
}

function Button(props: ButtonProps) {
  return props.tag === "button" ? (
    <ButtonComponent {...props} />
  ) : (
    <LinkButtonComponent {...props} />
  );
}

export default Button;

Button.defaultProps = defaultProps;
