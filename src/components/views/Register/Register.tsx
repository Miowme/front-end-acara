import { Button, Card, CardBody, Input, Link } from "@nextui-org/react";
import Image from "next/image";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const Register = () => {
    const {visiblePassword , handleVisiblePassword} = useRegister();
    return (
        <div className="flex w-full flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
            <div className="flex w-full lg:w-1/3 flex-col items-center justify-center gap-10">
                <Image
                    src="/images/general/logo.svg"
                    alt="logo"
                    width={180}
                    height={180}
                />
                <Image
                    src="/images/illustration/login.svg"
                    alt="login"
                    className="w-2/3 lg:w-full"
                    width={1024}
                    height={1024}
                />
            </div>
            <Card>
                <CardBody className="p-8">
                    <h2 className="text-xl font-bold text-danger-500">Create Account</h2>
                    <p className="mb-4 text-small">
                        <span className="mr-1">Have an account?</span>
                        <Link href="/login" className="font-semibold text-danger-400">
                            Login here
                        </Link>
                    </p>
                    <form className="flex w-80 flex-col gap-4">
                        <Input 
                            type="text" 
                            label="Fullname" 
                            variant="bordered" 
                            autoComplete="off"
                        />
                        <Input 
                            type="text" 
                            label="Username" 
                            variant="bordered" 
                            autoComplete="off"
                        />
                        <Input 
                            type="email" 
                            label="Email" 
                            variant="bordered" 
                            autoComplete="off"
                        />
                        <Input 
                            type={visiblePassword.password ? 'text' : 'password'}
                            label="Password" 
                            variant="bordered" 
                            autoComplete="off"
                            endContent={
                                <button 
                                    className="focus:outline-none" 
                                    type="button"
                                    onClick={() => handleVisiblePassword("password")}
                                >
                                    {visiblePassword.password ? (
                                        <FaEye className="pointer-events-none text-xl text-default-400"/>
                                    ) : (
                                        <FaEyeSlash className="pointer-events-none text-xl text-default-400"/>
                                    )}
                                </button>
                            }
                        />
                        <Input 
                            type={visiblePassword.passwordConfirmation ? 'text' : 'password'}
                            label="Password Confirmation" 
                            variant="bordered" 
                            autoComplete="off"
                            endContent={
                                <button 
                                    className="focus:outline-none" 
                                    type="button"
                                    onClick={() => handleVisiblePassword("passwordConfirmation")}
                                >
                                    {visiblePassword.passwordConfirmation ? (
                                        <FaEye className="pointer-events-none text-xl text-default-400"/>
                                    ) : (
                                        <FaEyeSlash className="pointer-events-none text-xl text-default-400"/>
                                    )}
                                </button>
                            }
                        />
                        <Button color="danger" size="lg" type="submit">
                            Register
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
};

export default Register;