"use client";

import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Plus, Star } from "lucide-react";
import Link from "next/link";
import { useLocalStorage } from "usehooks-ts";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";
import { usePathname, useSearchParams } from "next/navigation";
import { NavItem, Organization } from "./nav-item";

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = "t-sidebar-state" }: SidebarProps) => {
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const pathname = usePathname();

  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }

      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <div className="flex items-center justify-between mb-2">
          <Skeleton className="h-10 w-[50%]" />
          <Skeleton className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <NavItem.Skeleton />
          <NavItem.Skeleton />
          <NavItem.Skeleton />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Organizacoes</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/select-org">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      <Button
        asChild
        size="lg"
        className={cn(
          "font-normal justify-start px-2 w-full my-4",
          favorites && "bg-sky-500/10 text-sky-700"
        )}
        variant="ghost"
      >
        <Link
          href={{
            pathname,
            query: { favorites: true },
          }}
        >
          <Star className="h-4 w-4 mr-2" />
          Boards Favoritos
        </Link>
      </Button>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrganization?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
            isFavoriteActive={!!favorites}
          />
        ))}
      </Accordion>
    </>
  );
};
