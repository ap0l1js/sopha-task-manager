import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { userId, orgId } = auth();

    if (!userId || !orgId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const members =
      await clerkClient.organizations.getOrganizationMembershipList({
        organizationId: orgId,
        limit: 10,
        offset: 0,
      });

    return NextResponse.json(members);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
