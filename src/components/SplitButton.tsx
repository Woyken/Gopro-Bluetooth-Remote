import * as React from 'react';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';

interface IProps {
    buttonChoices: {
        icon: JSX.Element;
        label: string;
        onClick: () => void;
        id: number;
    }[];
    primaryButtonId: number;
    isGroupSelected: boolean;
}

const SplitButton: React.FC<IProps> = (props) => {
    const { buttonChoices, primaryButtonId, isGroupSelected } = props;
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);

    const primaryButton = buttonChoices.find((button) => button.id === primaryButtonId);

    const handleClick = () => {
        primaryButton?.onClick();
    };

    const handleMenuItemClick = (id: number) => {
        buttonChoices.find((button) => button.id === id)?.onClick();
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpen(false);
    };

    return (
        <>
            <ButtonGroup variant={isGroupSelected ? 'text' : 'outlined'} ref={anchorRef} aria-label="split button">
                <Button onClick={handleClick}>{primaryButton?.icon}</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleToggle}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal popperOptions={{ placement: 'top' }}>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {buttonChoices.map((buttonChoice) => (
                                        <MenuItem key={buttonChoice.id} selected={buttonChoice.id === primaryButtonId} onClick={() => handleMenuItemClick(buttonChoice.id)}>
                                            {buttonChoice.icon}
                                            {buttonChoice.label}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

export default SplitButton;
