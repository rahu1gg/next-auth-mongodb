// 'use client';

// import { dispatch, useAppSelector } from '@/client/store';
// import {
// 	setsuperadminroledisable,
// 	setsuperadminroleloading,
// 	setsuperadminroleuser,
// 	setsuperadminupdatedrole,
// } from '@/client/store/slices/superadmin-slice';
// import { api } from '@/client/trpc';
// import CircularLoader from '@/components/custom/loader/circular-loader';
// import { Button } from '@/components/ui/button';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Skeleton } from '@/components/ui/skeleton';
// import { useToast } from '@/components/ui/use-toast';
// import { ROLES, Role } from '@/constants/auth';
// import { RouterOutputs } from '@/server/api';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Image from 'next/image';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';

// const manageRolesSchema = z.object({
// 	email: z.string({ required_error: 'Please enter email!' }).email({ message: 'Please enter valid email!' }),
// });

// export function ManageRolesForm() {
// 	const { loading, disable } = useAppSelector((state) => state.superadminSlice).manageRoles;
// 	const { toast } = useToast();
// 	const form = useForm<z.infer<typeof manageRolesSchema>>({
// 		resolver: zodResolver(manageRolesSchema),
// 		defaultValues: {
// 			email: '',
// 		},
// 	});
// 	const mutation = api.superadmin.getUser.useMutation({
// 		onSuccess: (data) => {
// 			if (!data)
// 				toast({
// 					title: 'User not found',
// 					description: (
// 						<span>
// 							No user found with email: <span className='italic font-semibold'>{form.getValues('email')}</span>
// 						</span>
// 					),
// 				});
// 			dispatch(setsuperadminroleuser(data));
// 		},
// 		onError: (err) => {
// 			console.log(err);
// 		},
// 		onSettled: () => {
// 			dispatch(setsuperadminroleloading({ getUser: false }));
// 			dispatch(setsuperadminroledisable({ getUser: false }));
// 		},
// 	});

// 	function handleSubmit(data: z.infer<typeof manageRolesSchema>) {
// 		dispatch(setsuperadminroleloading({ getUser: true }));
// 		dispatch(setsuperadminroledisable({ getUser: true }));
// 		mutation.mutate({ email: data.email });
// 	}

// 	return (
// 		<Form {...form}>
// 			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6 max-w-lg mx-auto'>
// 				<FormField
// 					control={form.control}
// 					name='email'
// 					render={({ field }) => (
// 						<FormItem>
// 							<FormLabel>Email</FormLabel>
// 							<FormControl>
// 								<Input type='email' placeholder='Email of the user to update' autoComplete='off' {...field} />
// 							</FormControl>
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>
// 				<Button type='submit' className='w-full' disabled={disable.getUser}>
// 					<span className='relative'>
// 						{loading.getUser && <CircularLoader className='absolute -left-10 -top-0.5' indent='btn-primary' />}
// 						View User
// 					</span>
// 				</Button>
// 			</form>
// 		</Form>
// 	);
// }

// export function ManageRolesUser() {
// 	const { loading, user } = useAppSelector((state) => state.superadminSlice).manageRoles;

// 	if (!user) return null;

// 	if (user && loading.getUser)
// 		return (
// 			<div className='max-w-lg mx-auto'>
// 				<hr />
// 				<div className='border border-primary/30 mt-6 flex items-center justify-start gap-5 bg-primary/5 p-3 rounded-lg'>
// 					<div>
// 						<Skeleton className='w-[100px] h-[100px] rounded-lg bg-foreground/10' />
// 					</div>
// 					<div className='w-full'>
// 						<div className='font-semibold text-lg w-full h-8 '>
// 							<Skeleton className='bg-foreground/10' />
// 						</div>
// 						<div className='text-muted-foreground'>
// 							<Skeleton className='bg-muted-foreground/10' />
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		);

// 	return (
// 		<div className='max-w-lg mx-auto'>
// 			<hr />
// 			<div className='border border-primary/30 mt-6 flex items-center justify-start gap-5 bg-primary/5 p-3 rounded-lg'>
// 				<div>
// 					<Image
// 						src={user.image}
// 						className='w-[100px] h-[100px] rounded-lg'
// 						alt='user-profile-pic'
// 						width={100}
// 						height={100}
// 						loading='lazy'
// 						unoptimized
// 					/>
// 				</div>
// 				<div>
// 					<p className='font-semibold text-lg'>{user.name}</p>
// 					<p className='text-muted-foreground'>{user.email}</p>
// 				</div>
// 			</div>
// 			<UpdateRoleForm user={user} />
// 		</div>
// 	);
// }

// const manageRolesUserSchema = z.object({
// 	role: z.string({ required_error: 'Please select role!' }),
// });

// export function UpdateRoleForm({ user }: { user: NonNullable<RouterOutputs['superadmin']['getUser']> }) {
// 	const { loading, disable } = useAppSelector((state) => state.superadminSlice).manageRoles;
// 	const { toast } = useToast();
// 	const form = useForm<z.infer<typeof manageRolesUserSchema>>({
// 		resolver: zodResolver(manageRolesUserSchema),
// 		defaultValues: {
// 			role: user.role.toString(),
// 		},
// 	});
// 	const mutation = api.superadmin.updateRole.useMutation({
// 		onSuccess: (data) => {
// 			if (!data) {
// 				return toast({
// 					title: 'Update user failed',
// 					description: 'An error occured while updating role',
// 					variant: 'destructive',
// 				});
// 			}
// 			toast({
// 				title: 'User role updated',
// 				description: (
// 					<span>
// 						<em>{user.email}</em>'s role has been updated to <em>{Object.entries(ROLES).find((val) => val[1] === data.role)![0]}</em>
// 					</span>
// 				),
// 			});
// 			dispatch(setsuperadminupdatedrole(data.role));
// 			form.reset({ role: data.role.toString() });
// 		},
// 		onError: (err) => {
// 			console.error(err);
// 		},
// 		onSettled: () => {
// 			dispatch(setsuperadminroleloading({ updateRole: false }));
// 			dispatch(setsuperadminroledisable({ updateRole: false, getUser: false }));
// 		},
// 	});

// 	function handleSubmit(data: z.infer<typeof manageRolesUserSchema>) {
// 		dispatch(setsuperadminroleloading({ updateRole: true }));
// 		dispatch(setsuperadminroledisable({ updateRole: true, getUser: true }));
// 		mutation.mutate({ email: user?.email as string, role: Number(data.role) as Role });
// 	}

// 	return (
// 		<Form {...form}>
// 			<form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-8 max-w-lg mx-auto py-5'>
// 				<FormField
// 					control={form.control}
// 					name='role'
// 					render={({ field }) => (
// 						<FormItem>
// 							<FormLabel>Role to be Updated</FormLabel>
// 							<Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
// 								<FormControl>
// 									<SelectTrigger>
// 										<SelectValue placeholder='Select a role to update' />
// 									</SelectTrigger>
// 								</FormControl>
// 								<SelectContent>
// 									{Object.entries(ROLES).map((val) => {
// 										return (
// 											<SelectItem key={`${val}`} value={val[1].toString()}>
// 												{val[0]}
// 											</SelectItem>
// 										);
// 									})}
// 								</SelectContent>
// 							</Select>
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>
// 				<Button className='w-full' type='submit' disabled={!form.formState.isDirty || disable.updateRole}>
// 					<span className='relative'>
// 						{loading.updateRole && <CircularLoader className='absolute -left-10 -top-0.5' indent='btn-primary' />}
// 						Update Role
// 					</span>
// 				</Button>
// 			</form>
// 		</Form>
// 	);
// }
