import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import type * as React from "react";
import { DayPicker } from "react-day-picker";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function Chevron({
	orientation,
	className,
}: {
	orientation?: "up" | "down" | "left" | "right";
	className?: string;
}) {
	const Icon =
		orientation === "left"
			? ChevronLeft
			: orientation === "right"
				? ChevronRight
				: ChevronDown;
	return <Icon className={cn("h-4 w-4", className)} />;
}

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	captionLayout = "label",
	...props
}: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			captionLayout={captionLayout}
			className={cn("p-3", className)}
			classNames={{
				months: "relative flex flex-col gap-4 sm:flex-row",
				month: "flex w-full flex-col gap-4",
				nav: "absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1",
				button_previous: cn(
					buttonVariants({ variant: "outline" }),
					"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
				),
				button_next: cn(
					buttonVariants({ variant: "outline" }),
					"h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
				),
				month_caption: "flex h-7 w-full items-center justify-center px-8",
				dropdowns:
					"flex items-center justify-center gap-1.5 text-sm font-medium",
				dropdown_root:
					"relative rounded-md border border-input has-focus:ring-1 has-focus:ring-ring",
				dropdown: "absolute inset-0 cursor-pointer opacity-0 bg-popover",
				caption_label: cn(
					"text-sm font-medium select-none",
					captionLayout !== "label" &&
						"flex h-7 items-center gap-1 rounded-md pl-2 pr-1 [&>svg]:size-3.5 [&>svg]:opacity-50",
				),
				month_grid: "w-full border-collapse",
				weekdays: "flex",
				weekday:
					"w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground",
				week: "mt-2 flex w-full",
				day: "relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:rounded-md [&:has([aria-selected])]:bg-accent",
				day_button: cn(
					buttonVariants({ variant: "ghost" }),
					"h-9 w-9 p-0 font-normal aria-selected:opacity-100",
				),
				selected:
					"[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
				today: "[&>button]:bg-accent [&>button]:text-accent-foreground",
				outside: "text-muted-foreground opacity-50",
				disabled: "text-muted-foreground opacity-50",
				hidden: "invisible",
				...classNames,
			}}
			components={{ Chevron }}
			{...props}
		/>
	);
}
Calendar.displayName = "Calendar";

export { Calendar };
