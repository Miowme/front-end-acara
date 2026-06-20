import { Button, Card, CardBody, CardHeader, Input, Spinner } from "@nextui-org/react"
import useSecurityTab from "./useSecurityTab";
import { Controller } from "react-hook-form";

const SecurityTab = () => {
    const {
        controlUpdatePassword,
        errorsUpdatePassword,
        handleSubmitUpdatePassword,
        isPendingMutateUpdatePassword,
        handleUpdatePassword,
    } = useSecurityTab();

    return (
        <Card className="w-full p-4 lg:w-1/2">
            <CardHeader className="flex-col items-center">
                <h1 className="text-xl font-bold w-full">Security</h1>
                <p className="text-small text-default-400 w-full">
                    Update your account security
                </p>
            </CardHeader>
            <CardBody>
                <form 
                    className="flex flex-col gap-4" 
                    onSubmit={handleSubmitUpdatePassword(handleUpdatePassword)}
                >
                    <Controller 
                        name="oldPassword"
                        control={controlUpdatePassword}
                        render={({field}) => ( 
                        <Input 
                            {...field}
                            label="Old Password" 
                            variant="bordered" 
                            labelPlacement="outside"
                            placeholder="Input your old password"
                            isInvalid={errorsUpdatePassword.oldPassword !== undefined}
                            errorMessage={errorsUpdatePassword.oldPassword?.message}
                            className="mt-2"
                            type="password"
                        />
                        )}
                    />
                    <Controller 
                        name="password"
                        control={controlUpdatePassword}
                        render={({field}) => ( 
                        <Input 
                            {...field}
                            label="New Password" 
                            variant="bordered" 
                            labelPlacement="outside"
                            placeholder="Input your new password"
                            isInvalid={errorsUpdatePassword.password !== undefined}
                            errorMessage={errorsUpdatePassword.password?.message}
                            className="mt-2"
                            type="password"
                        />
                        )}
                    />
                    <Controller 
                        name="confirmPassword"
                        control={controlUpdatePassword}
                        render={({field}) => ( 
                        <Input 
                            {...field}
                            label="Confirm New Password" 
                            variant="bordered" 
                            labelPlacement="outside"
                            placeholder="Input your new password"
                            isInvalid={errorsUpdatePassword.confirmPassword !== undefined}
                            errorMessage={errorsUpdatePassword.confirmPassword?.message}
                            className="mt-2"
                            type="password"
                        />
                        )}
                    />
                    <Button
                        color="danger"
                        className="mt-2 disabled:bg-default-500"
                        type="submit"
                        disabled={isPendingMutateUpdatePassword}
                    >
                        {isPendingMutateUpdatePassword ? (
                        <Spinner size="sm" color="white" /> 
                            ) : (
                            "Update Password"
                        )}
                    </Button>
                </form>
            </CardBody>
        </Card>
    );
};

export default SecurityTab;