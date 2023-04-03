import React from 'react'

export const UserOptions = () => {
  return (
    <Fragment>
        <Backdrop open={open} style={{ zIndex:'10' }} />
        <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex:"11" }}
        className="speedDial"
        open={open}
        direction="down"
        icon={
            <img
            className='speedDialIcon'
            src={ user.avatar.url ? user.avatar.url : '/Profile.png'}
            alt='Profile'
            />
        }
        >
            {options.map((item) => (
                <SpeedDialAction
                key={item.key}
                icon={item.icon}
                tooltipTitle={item.name}
                onClick={item.func}
                tooltipOpen={window.innerWidth <= 600 ? true : false}
                />
            ))}
        </SpeedDial>
    </Fragment>
  )
}
