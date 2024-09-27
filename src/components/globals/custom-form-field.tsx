/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import React, { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import {
  DATE_DEFAULT_FORMAT,
  DATE_DISPLAY_FORMAT,
  DATE_YEAR_MIN,
  FormFieldType,
  OPT_LENGTH,
  UploaderType,
} from "@/constants";
import { cn } from "@/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/globals/custom-calendar";
import { CalendarIcon, Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  options?: Array<string>;
  label?: string;
  type?: string | number;
  placeholder?: string;
  description?: string | React.ReactNode;
  icon?: React.ReactNode;
  dateFormat?: string;
  showTimeSelect?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  isRequired?: boolean;
  className?: string;
  uploaderVar?: UploaderType;
  enableAI?: boolean;
  autoFocus?: boolean;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const HoverEffectWrapper: React.FC<{
  children: React.ReactNode;
  disabled?: boolean;
}> = ({ children, disabled }) => {
  const radius = 100;
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
                    radial-gradient(${
                      visible ? radius + "px" : "0px"
                    } circle at ${mouseX}px ${mouseY}px,
                    hsl(var(--${disabled ? "secondary" : "ring"})),
                    transparent 80%
                    )
                `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className={
        "p-[2px] rounded-lg transition duration-300 group/input w-full"
      }
    >
      <section className="shad-input-icon">{children}</section>
    </motion.div>
  );
};

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    icon,
    placeholder,
    disabled,
    description,
    type,
    options,
    label,
    autoFocus,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <>
          {icon && <div className="ml-3 self-center">{icon}</div>}
          <FormControl>
            <div className="shad-input-outer">
              <Input
                type={
                  type === "password" && !showPassword ? "password" : "text"
                }
                placeholder={placeholder}
                disabled={disabled}
                {...field}
                className="shad-input"
                autoFocus={autoFocus}
                onChange={(event) => {
                  const value =
                    type === "number"
                      ? parseFloat(event.target.value)
                      : event.target.value;
                  field.onChange(value);
                }}
              />
              {type === "password" && (
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={toggleShowPassword}
                  className="floating-right-btn"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4 opacity-50" />
                  )}
                </button>
              )}
            </div>
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
        </>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <>
          <FormControl>
            <PhoneInput
              placeholder={placeholder}
              defaultCountry="PH"
              international
              countryCallingCodeEditable={false}
              withCountryCallingCode
              limitMaxLength={true}
              numberInputProps={{
                className: `rounded-md text-sm px-4 flex w-full outline-none pl-2 justify-start font-normal h-full w-full focus-visible:ring-0 focus-visible:ring-offset-0 !bg-transparent border-0 ${
                  !field.value ? "text-gray-500" : ""
                }`,
              }}
              value={field.value as string}
              onChange={field.onChange}
              maxLength={16}
              className="h-9 rounded-md border px-3"
              disabled={disabled}
            />
          </FormControl>

          {description && <FormDescription>{description}</FormDescription>}
        </>
      );

    case FormFieldType.OTP_INPUT:
      return (
        <FormControl>
          <InputOTP
            maxLength={OPT_LENGTH}
            pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            {...field}
          >
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTP>
        </FormControl>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger
              disabled={disabled}
              className={cn(
                "focus-visible:ring-0 focus-visible:ring-offset-0",
                !field.value && "text-muted-foreground"
              )}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              {options &&
                options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline"}
                className={cn(
                  "flex w-full pl-2 justify-start font-normal focus-visible:ring-0 focus-visible:ring-offset-0 disabled:cursor-not-allowed",
                  !field.value && "text-muted-foreground"
                )}
                disabled={disabled}
              >
                <CalendarIcon className="mr-4 h-4 w-4" />
                {field.value ? (
                  format(field.value, DATE_DISPLAY_FORMAT)
                ) : (
                  <span>Select a date</span>
                )}
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent align="start" className=" w-auto p-0">
            <Calendar
              mode="single"
              captionLayout="dropdown-buttons"
              selected={field.value ? new Date(field.value) : undefined}
              onSelect={(date) =>
                date && field.onChange(format(date, DATE_DEFAULT_FORMAT))
              }
              fromYear={DATE_YEAR_MIN}
              toYear={new Date().getFullYear()}
              disabled={(date) => date > new Date()}
            />
          </PopoverContent>
        </Popover>
      );

    case FormFieldType.RADIO:
      return (
        <FormControl>
          <RadioGroup
            defaultValue={field.value}
            onValueChange={field.onChange}
            className="radio-group"
            disabled={disabled}
          >
            {options &&
              options.map((option) => (
                <HoverEffectWrapper key={option} disabled={disabled}>
                  <FormItem className="radio-item">
                    <FormControl>
                      <RadioGroupItem value={option} />
                    </FormControl>
                    <FormLabel className="!my-auto font-normal">
                      {option}
                    </FormLabel>
                  </FormItem>
                </HoverEffectWrapper>
              ))}
          </RadioGroup>
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <div className="items-top flex space-x-2">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
            />
          </FormControl>
          <div className="grid gap-1.5 leading-none">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
        </div>
      );

    case FormFieldType.DROP_ZONE:
      return (
        <FormControl>
          <div>Image Upload</div>
        </FormControl>
      );

    case FormFieldType.HIDDEN:
      return (
        <FormControl>
          <Input
            type="text"
            name="verify"
            value={field.value}
            onChange={field.onChange}
            hidden
          />
        </FormControl>
      );

    case FormFieldType.HONEY_POT:
      return (
        <FormControl>
          <Input
            type="text"
            name="xfield"
            value={""}
            // onChange={field.onChange}
            className="hidden"
          />
        </FormControl>
      );

    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, label, name, isRequired, className } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="space-y-1">
            {fieldType !== FormFieldType.CHECKBOX && label && (
              <FormLabel>
                {label}
                {isRequired === true ? (
                  <span className="text-red-700 tex-lg"> *</span>
                ) : isRequired === false ? (
                  <span className="text-gray-500 text-xs font-normal ml-2">
                    (Optional)
                  </span>
                ) : (
                  ""
                )}
              </FormLabel>
            )}
            <RenderField field={field} props={props} />
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
