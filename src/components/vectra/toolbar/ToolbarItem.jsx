import { ToolbarButton } from "./ToolbarButton";

/**
 * type: "tool" | "action" | "custom" | "drag" | "separator" | "dropdown"
 */
export class ToolbarItem {
    constructor({
        key,
        type,
        icon,
        tooltip,
        toolName,
        onClick,
        draggable,
        group,
        options,
    }) {
        this.key = key;
        this.type = type;
        this.icon = icon;
        this.tooltip = tooltip;
        this.toolName = toolName;
        this.onClick = onClick;
        this.draggable = draggable || false;
        this.group = group || null;
        this.options = options || null;
    }

    render(selectedToolKey, draggingProps = null) {
        const isSelected = this.key === selectedToolKey;
        return (
            <ToolbarButton
                key={this.key}
                icon={this.icon}
                tooltip={this.tooltip}
                onClick={this.onClick}
                draggingProps={this.draggable ? draggingProps : null}
                type={this.type}
                selected={isSelected}
                options={this.options}
            />
        );
    }
}
